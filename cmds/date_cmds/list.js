#!/usr/bin/env node
exports.command = 'list';
exports.desc = 'List all project dates';
exports.builder = {};
exports.handler = list_dates;

function list_dates(argv) {
  console.log('DATES LIST');
  argv._handled = true;
}
