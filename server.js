#!/usr/bin/env node
const express = require( 'express' );
const logger = require( 'morgan' );
const jade = require( 'jade' );
const fs = require( 'fs' );
const config = require( './lib/config' );

const app = express();
const homepage = jade.compileFile( `${__dirname}/source/templates/homepage.jade` );
const ganttpage = jade.compileFile( `${__dirname}/source/templates/gantt.jade` );

app.use( logger( 'dev' ) );
app.use( express.static( `${__dirname}/static` ) );
app.use( '/scripts', express.static( `${__dirname}/source/scripts` ) );

app.get( '/', ( req, res, next ) => {
  try {
    // Get projects
    const files = fs.readdirSync( './data' )
      .filter( f => f.endsWith( '.yaml' ) )
      .map( f => f.slice( 0, -5 ) );

    const html = homepage( {
      title: 'Home',
      files,
    } );
    res.send( html );
  } catch ( e ) {
    next( e );
  }
} );

app.get( '/gantt', ( req, res, next ) => {
  // @@@ Get the correct data based on request parameter
  try {
    // Get projects
    // @@@ Don't duplicate this?
    const files = fs.readdirSync( './data' )
      .filter( f => f.endsWith( '.yaml' ) )
      .map( f => f.slice( 0, -5 ) );

    const project = req.query.project || 'example';
    // @@@ If project not in files, show not found page.

    const html = ganttpage( {
      title: 'Home',
      files,
      task_array: JSON.stringify( config.get_tasks( `${project}.yaml` ) ),
    } );
    res.send( html );
  } catch ( e ) {
    next( e );
  }
} );

app.listen( process.env.PORT || 3000, () => {
  console.log( `Listening on http://localhost:${process.env.PORT || 3000}` );
} );
