const readline = require('readline');
const path = require('path');
const spawn = require('cross-spawn');
const fs = require('fs');
const fse = require('fs-extra');
const chalk = require('chalk');
const which = require('which');
const ProgressBar = require('progress');

const execPath = __dirname;
const corePath = path.resolve(execPath.slice(0, -8), 'rainywebpack');

function updateCore(ts) {
  const branch = ts ? 'ts' : 'master';
  return new Promise((resolve, reject) => {
    const updateBar = new ProgressBar(`${chalk.blue('Updating rainywebpack:')} [:bar] :percent`, {
      complete: '=',
      incomplete: '-',
      total: 30,
    });
    const updateProcess = spawn(`git checkout ${branch} && git pull origin ${branch}`, {
      shell: true,
      cwd: corePath,
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
  const appName = destPath.split(/[\\|/]/).pop();
  const list = fs.readdirSync(corePath).filter(f => !['.DS_Store', '.git', 'node_modules', 'package.json', '*.bak', '*.*.bak', '*.tmp', '*.swp'].includes(f));

  console.log(chalk.green('Initial rainywebpack...'))

  return new Promise((resolve, reject) => {
    setTimeout(function () {
      Promise.all(list.map(file => {
        return fse.copy(`${corePath}/${file}`, `${destPath}/${file}`)
          .then(() => console.log(chalk.green(`create: ${destPath}/${file}`)))
      }))
        .then(() => {
          const appPkg = require(`${corePath}/package.json`);
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

function writeFile(destPath, content, mode = 0644) {
  fs.writeFileSync(destPath, content, { mode });
  console.log(chalk.green(`create: ${destPath}`));
}

function findYarn() {
  const binList = process.platform === 'win32' ? ['yarn.cmd', 'tnpm.cmd', 'cnpm.cmd', 'npm.cmd'] : ['yarn', 'tnpm', 'cnpm', 'npm'];
  for(let i = 0; i < binList.length; i++) {
    try {
      which.sync(binList[i]);
      return binList[i];
    } catch (e) {

    }
  }
  throw new Error('please install yarn or npm');
}

function emptyDirectory(path, fn) {
  fs.readdir(path, function(err, files){
    if (err && 'ENOENT' != err.code) throw err;
    fn(!files || !files.length);
  });
}

function confirm (msg, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(msg, function (input) {
    rl.close();
    callback(/^y|yes|ok|true$/i.test(input));
  });
}

module.exports = {
  updateCore,
  copyCore,
  emptyDirectory,
  findYarn,
  confirm,
}
