#!/usr/bin/env node
const express = require( 'express' );
const logger = require( 'morgan' );
const template = require( 'jade' ).compileFile( `${__dirname}/source/templates/homepage.jade` );

const app = express();

app.use( logger( 'dev' ) );
app.use( express.static( `${__dirname}/static` ) );

app.get( '/', ( req, res, next ) => {
  try {
    const html = template( { title: 'Home' } );
    res.send( html );
  } catch ( e ) {
    next( e );
  }
} );

app.listen( process.env.PORT || 3000, () => {
  console.log( `Listening on http://localhost:${process.env.PORT || 3000}` );
} );
