const path = require('path');
const spawn = require('cross-spawn');

function init(dirname) {
  const fetchProcess = spawn('git', ['clone', 'git@github.com:geekrainy/rainywebpack', path.resolve(dirname)], { stdio: 'inherit' });

  fetchProcess.on('close', function() {
    spawn('rm', ['-rf', path.resolve(dirname, '.git')]);
    spawn('yarn', ['install', '--cwd', path.resolve(dirname)], { stdio: 'inherit' });
  })

}

module.exports = init;