#!/usr/bin/env node
exports.command = 'date <command>';
exports.desc = 'Manage project dates';
exports.builder = function (yargs) {
  return yargs
    .commandDir('date_cmds')
    .demandCommand(1)
    .help();
};
exports.handler = function (argv) {
  if (!argv._handled) {
    console.log("Unrecognized sub-command: " + argv._[0]);
    throw "Unrecognized sub-command";
  }
};
