const path = require('path');
const spawn = require('cross-spawn');
const fse = require('fs-extra');
const { emptyDirectory, confirm } = require('../utils');

function create(dirname) {
  const fetchProcess = spawn('git', ['clone', 'git@github.com:geekrainy/rainywebpack.git', path.resolve(dirname)], { stdio: 'inherit' });

  fetchProcess.on('close', function() {
    spawn('rm', ['-rf', path.resolve(dirname, '.git')]);
    spawn('yarn', ['install', '--cwd', path.resolve(dirname)], { stdio: 'inherit' });
  })
}

function init(dirname) {
  emptyDirectory(dirname, function (empty) {
    if (empty) {
      create(dirname);
    } else {
      confirm('Directory is not empty, continue? [y/N] ', function (ok) {
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