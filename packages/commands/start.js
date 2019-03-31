const chalk = require('chalk');

function start() {
  console.log(chalk.blue(`
               _                              __  
   _________ _(_)___  __  ______  ____ ______/ /__
  / ___/ __ \`/ / __ \\/ / / / __ \\/ __ \`/ ___/ //_/
 / /  / /_/ / / / / / /_/ / /_/ / /_/ / /__/ ,<   
/_/   \\__,_/_/_/ /_/\\__, / .___/\\__,_/\\___/_/|_|  
                   /____/_/                       
  `))
  console.log('See --help for a list of available commands.')
}

module.exports = start;