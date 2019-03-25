const path = require('path');
const spawn = require('cross-spawn');
const fse = require('fs-extra');
const chalk = require('chalk');
const { updateCore, copyCore, findYarn, emptyDirectory, confirm } = require('../utils');

async function create(dirname, install) {
  const destPath = path.resolve(dirname);
  const yarn = findYarn();
  await updateCore();
  await copyCore(destPath)
  if (install) {
    spawn(yarn, ['install', '--cwd', path.resolve(destPath)], { stdio: 'inherit' });
  }
}

function init(dirname, cmd) {
  const { install = true } = cmd;
  emptyDirectory(dirname, function (empty) {
    if (empty) {
      create(dirname, install);
    } else {
      confirm(chalk.red('Directory is not empty, continue? [y/N] '), function (ok) {
        if (ok) {
          process.stdin.destroy();
          fse.removeSync(path.resolve(dirname))
          create(dirname, install);
        } else {
          console.error('aborting');
          exit(1);
        }
      });
    }
  })
}

module.exports = init;