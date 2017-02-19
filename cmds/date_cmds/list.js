#!/usr/bin/env node
function list_dates( argv ) {
  console.log( 'DATES LIST' );
  argv.handled = true;
}

exports.command = 'list';
exports.desc = 'List all project dates';
exports.builder = {};
exports.handler = list_dates;
