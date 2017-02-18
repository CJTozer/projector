#!/usr/bin/env node

// Following yargs structure here: https://www.npmjs.com/package/yargs#example-command-hierarchy-using-commanddir
const yargs = require('yargs');
const argv = yargs
  .commandDir('cmds')
  .demandCommand(1)
  .help()
  .argv;

if (!argv._handled) {
  console.log("Unrecognized command: " + argv._[0]);
  yargs.showHelp();
}

// // TODO - get dir from config/env.
// const config_dir = path.join( process.env.HOME, '.projector-data' );
//
// const files = fs.readdirSync( config_dir )
//   .filter( f => f.endsWith( '.yaml' ) )
//   .map( f => f.slice( 0, -5 ) );
//
// console.log( files );
