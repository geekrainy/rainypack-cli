#!/usr/bin/env node
const program = require('commander');
const start = require('../packages/commands/start');
const init = require('../packages/commands/init');

program
  .version('1.0.0','-v, --version')
  .command('start')
  .description('display welcome page')
  .action(start);

program
  .command('init')
  .description('initial a rainywebpack project in current directory')
  .action(function() {
    init('.');
  });

program
  .command('new [dir]')
  .description('initial a new project')
  .action(function(dir){
      init(dir);
  });

program.on('command:*', function(){
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
  });

program.parse(process.argv);

if (program.args.length === 0) {
  start();
}
