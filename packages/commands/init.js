const path = require('path');
const spawn = require('cross-spawn');

function init(dirname) {
  spawn('git', ['clone', 'git@github.com:geekrainy/rainywebpack', path.resolve(dirname)], { stdio: 'inherit' });
}

module.exports = init;