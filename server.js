#!/usr/bin/env node
const express = require( 'express' );
const logger = require( 'morgan' );
const template = require( 'jade' ).compileFile( `${__dirname}/source/templates/homepage.jade` );
const config = require( './lib/config' );

const app = express();

app.use( logger( 'dev' ) );
app.use( express.static( `${__dirname}/static` ) );
app.use( '/scripts', express.static( `${__dirname}/source/scripts` ) );

app.get( '/', ( req, res, next ) => {
  try {
    const html = template( {
      title: 'Home',
      task_array: JSON.stringify( config.get_tasks( 'example.yaml' ) ),
    } );
    res.send( html );
  } catch ( e ) {
    next( e );
  }
} );

app.get( '/data', ( req, res, next ) => {
  try {
    const json = config.get_tasks( 'example.yaml' );
    res.send( json );
  } catch ( e ) {
    next( e );
  }
} );

app.listen( process.env.PORT || 3000, () => {
  console.log( `Listening on http://localhost:${process.env.PORT || 3000}` );
} );
