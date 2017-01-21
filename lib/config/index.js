#!/usr/bin/env node

const path = require( 'path' );
const Duration = require( 'duration-js' );
const Config = require( 'merge-config' );

// Load the set of tasks in the specified project.
module.exports.get_tasks = function( proj_file ) {
  // Get the global defaults then override with the specified specification.
  const built_config = new Config();
  built_config.file( path.join( __dirname, '..', '..', 'data', proj_file ) );

  return built_config.get().tasks.map( ( x ) => {
    const done = ( new Duration( x.done ) ).milliseconds();
    const left = ( new Duration( x.left ) ).milliseconds();
    // Can only pass numbers/strings as this is passed to the browser as a JSON string.
    return {
      id: x.id,
      name: x.description,
      resource: x.group,
      start: x.start,
      end: x.end,
      duration: done + left,
      progress: Math.floor( ( 100 * done ) / ( done + left ) ),
      dependencies: x.dependencies,
    };
  } );
};
