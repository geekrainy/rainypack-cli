const chalk = require('chalk');

function start() {
  console.log(chalk.blue(`
               _                           __                     __  
   _________ _(_)___  __  ___      _____  / /_  ____  ____ ______/ /__
  / ___/ __ \`/ / __ \\\/ / / / | /| / / _ \\\/ __ \\\/ __ \\\/ __ \`/ ___/ //_/
 / /  / /_/ / / / / / /_/ /| |/ |/ /  __/ /_/ / /_/ / /_/ / /__/ ,<   
/_/   \\__,_/_/_/ /_/\\__, / |__/|__/\\___/_.___/ .___/\\__,_/\\___/_/|_|  
                   /____/                   /_/                       
  `))
  console.log('See --help for a list of available commands.')
}

module.exports = start;