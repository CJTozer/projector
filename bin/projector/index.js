#! /usr/bin/env node
const fs = require( 'fs' );
const path = require( 'path' );

// TODO - get dir from config/env.
const config_dir = path.join( process.env.HOME, '.projector-data' );

const files = fs.readdirSync( config_dir )
  .filter( f => f.endsWith( '.yaml' ) )
  .map( f => f.slice( 0, -5 ) );

console.log( files );
