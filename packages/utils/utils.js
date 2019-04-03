const readline = require('readline');
const fs = require('fs');
const chalk = require('chalk');
const which = require('which');

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
  writeFile,
  emptyDirectory,
  findYarn,
  confirm,
}
