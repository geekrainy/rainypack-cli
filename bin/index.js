#!/usr/bin/env node
const program = require('commander');
const start = require('../packages/commands/start');
const init = require('../packages/commands/init');
const pkg = require('../package.json');

const { version } = pkg;

program
  .version(version,'-v, --version')
  .command('start')
  .description('display welcome page')
  .action(start);

program
  .command('init')
  .description('initial a rainypack project in current directory')
  .option('-n, --no-install', 'Install dependencies after project create, default: true')
  .option('-t, --ts', 'Initial project with TypeScript')
  .action(function(cmd) {
    init('.', cmd);
  });

program
  .command('new [dir]')
  .description('initial a new rainypack')
  .option('-n, --no-install', 'Install dependencies after project create, default: true')
  .option('-t, --ts', 'Initial project with TypeScript')
  .action(function(dir, cmd){
      init(dir, cmd);
  });

program.on('command:*', function(){
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
  });

program.parse(process.argv);

if (program.args.length === 0) {
  start();
}
