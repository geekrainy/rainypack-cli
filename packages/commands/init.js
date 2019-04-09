const path = require('path');
const spawn = require('cross-spawn');
const fs = require('fs');
const fse = require('fs-extra');
const chalk = require('chalk');
const ProgressBar = require('progress');

const { writeFile, findYarn, emptyDirectory, confirm } = require('../utils/utils');
const { CORE_PATH_PREFIX, CORE_IGNORE_LIST, TS_CORE_IGNORE_LIST, CORE_NAME, CORE_TYPE } = require('../utils/constants');

const packagePath = __dirname.split(path.sep).slice(0, -2).join(path.sep);
const coreConfig = {
  name: CORE_NAME.webpack,
  path: path.resolve(packagePath, 'node_modules', CORE_NAME.webpack),
  type: CORE_TYPE.default,
}
const yarn = findYarn();

function init(dirname, cmd) {
  emptyDirectory(dirname, function (empty) {
    if (empty) {
      create(dirname, cmd);
    } else {
      confirm(chalk.red('Directory is not empty, continue? [y/N] '), function (ok) {
        if (ok) {
          process.stdin.destroy();
          create(dirname, cmd);
        } else {
          console.error('aborting');
          exit(1);
        }
      });
    }
  })
}

async function create(dirname, cmd) {
  const { install = true, ts = false, rollup = false } = cmd;
  const destPath = path.resolve(dirname);

  if (ts) {
    coreConfig.type = CORE_TYPE.ts;
  }

  if (rollup) {
    coreConfig.path = path.resolve(packagePath, 'node_modules', CORE_NAME.rollup);
  }

  await updateCore();
  await copyCore(destPath);
  if (install) {
    spawn(yarn, ['install', '--cwd', path.resolve(destPath)], { stdio: 'inherit' });
  }
}

function updateCore() {
  return new Promise((resolve, reject) => {
    const updateBar = new ProgressBar(`${chalk.blue('Updating rainypack:')} [:bar] :percent`, {
      complete: '=',
      incomplete: '-',
      total: 30,
    });
    const updateProcess = spawn(yarn, ['upgrade', coreConfig.name], {
      shell: true
    })
    const timer = setInterval(function (){
      updateBar.tick();
      if (updateBar.curr === 28) {
        clearInterval(timer);
      }
    }, 200);

    updateProcess.on('exit', () => {
      updateBar.tick(30);
      clearInterval(timer)
      resolve();
    });
    updateProcess.on('error', err => reject(err));
  })
}

function copyCore(destPath) {
  const appName = destPath.split(path.sep).pop();

  const defaultCorePath = `${coreConfig.path}/lib`;
  const tsCorePath = `${coreConfig.path}/ts`;

  const ignoreList = coreConfig.type === 'ts' ? [...CORE_IGNORE_LIST, ...TS_CORE_IGNORE_LIST] : CORE_IGNORE_LIST;
  const appPkgPath = coreConfig.type === 'ts' ? `${tsCorePath}/package.json` : `${defaultCorePath}/package.json`;

  let list = fs.readdirSync(defaultCorePath)
    .filter(f => !ignoreList.includes(f))
    .map(f => `${CORE_PATH_PREFIX.default}/${f}`);

  if (coreConfig.type === 'ts') {
    const tsList = fs.readdirSync(tsCorePath)
      .filter(f => !CORE_IGNORE_LIST.map(f => `${CORE_PATH_PREFIX.ts}/${f}`).includes(f))
      .map(f => `${CORE_PATH_PREFIX.ts}/${f}`);

    list = list.concat(tsList);
  }

  console.log(chalk.green('Initial rainypack...'))

  return new Promise((resolve, reject) => {
    setTimeout(function () {
      Promise.all(list.map(file => {
        const destFileName = file.replace(/(lib|ts)\//, '');

        return fse.copy(`${coreConfig.path}/${file}`, `${destPath}/${destFileName}`)
          .then(() => console.log(chalk.green(`create: ${destPath}/${destFileName}`)))
      }))
        .then(() => {
          const appPkg = require(appPkgPath);
          appPkg.name = appName;
          appPkg.description = appName;
          appPkg.author = '';
  
          writeFile(`${destPath}/package.json`, JSON.stringify(appPkg, null, 2));
          resolve();
        })
        .catch(err => reject(err));
    }, 500)
  })
}

module.exports = init;
