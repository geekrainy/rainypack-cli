const readline = require('readline');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

const execPath = __dirname;
const corePath = path.resolve(execPath.slice(0, -8), 'rainywebpack');

function copyCore(destPath) {
  const appName = destPath.split('/').pop();
  const list = fs.readdirSync(corePath).filter(f => !['.DS_Store', '.git', 'node_modules', '*.bak', '*.*.bak', '*.tmp', '*.swp'].includes(f));
  return new Promise((resolve, reject) => {
    Promise.all(list.map(file => {
      return fse.copy(`${corePath}/${file}`, `${destPath}/${file}`)
        .then(() => console.log(`create: ${destPath}/${file}`))
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
  })
}

function writeFile(destPath, content, mode = 0644) {
  fs.writeFileSync(destPath, content, { mode });
  console.log(`create: ${destPath}`);
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
  copyCore,
  emptyDirectory,
  confirm,
}