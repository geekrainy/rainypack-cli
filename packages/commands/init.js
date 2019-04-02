const path = require('path');
const spawn = require('cross-spawn');
const fse = require('fs-extra');
const chalk = require('chalk');
const { updateCore, copyCore, findYarn, emptyDirectory, confirm } = require('../utils');

async function create(dirname, cmd) {
  const { install = true, ts = false, rollup = false } = cmd;
  const destPath = path.resolve(dirname);
  const yarn = findYarn();
  await updateCore(rollup, ts);
  await copyCore(rollup, destPath);
  if (install) {
    spawn(yarn, ['install', '--cwd', path.resolve(destPath)], { stdio: 'inherit' });
  }
}

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

module.exports = init;