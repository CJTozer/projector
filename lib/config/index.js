#!/usr/bin/env node

const Config = require( 'merge-config' );
const path = require( 'path' );

// Load the set of tasks in the specified project.
module.exports.get_tasks = function( proj_file ) {
  // Get the global defaults then override with the specified specification.
  const built_config = new Config();
  built_config.file( path.join( __dirname, '..', '..', 'data', proj_file ) );

  return built_config.get();
};
