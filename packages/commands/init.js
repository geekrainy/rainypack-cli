const path = require('path');
const spawn = require('cross-spawn');
const fse = require('fs-extra');
const chalk = require('chalk');
const { copyCore, emptyDirectory, confirm } = require('../utils');

function create(dirname) {
  const destPath = path.resolve(dirname);
  copyCore(destPath).then(() => {
    spawn('yarn', ['install', '--cwd', path.resolve(destPath)], { stdio: 'inherit' });
  })
}

function init(dirname) {
  emptyDirectory(dirname, function (empty) {
    if (empty) {
      create(dirname);
    } else {
      confirm(chalk.red('Directory is not empty, continue? [y/N] '), function (ok) {
        if (ok) {
          process.stdin.destroy();
          fse.removeSync(path.resolve(dirname))
          create(dirname);
        } else {
          console.error('aborting');
          exit(1);
        }
      });
    }
  })
}

module.exports = init;