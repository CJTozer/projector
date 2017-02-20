#!/usr/bin/env node

'use strict';

const express = require( 'express' );
const logger = require( 'morgan' );
const jade = require( 'jade' );
const fs = require( 'fs' );
const Config = require( './lib/config' );

const app = express();
const homepage = jade.compileFile( `${__dirname}/source/templates/homepage.jade` );
const project_page = jade.compileFile( `${__dirname}/source/templates/project.jade` );

app.use( logger( 'dev' ));
app.use( express.static( `${__dirname}/static` ));
app.use( '/scripts', express.static( `${__dirname}/source/scripts` ));

app.get( '/', ( req, res, next ) => {
  try {
    // Get projects
    const files = fs.readdirSync( './data' )
      .filter( f => f.endsWith( '.yaml' ))
      .map( f => f.slice( 0, -5 ));
    let html;

    const project = req.query.project || 'example';
    if ( files.indexOf( project ) === -1 ) {
      // Project not specified or non-existent.
      html = homepage({
        title: 'Projects',
        files,
      });
    } else {
      const project_config = new Config( `${project}.yaml` );
      let title;
      if ( project_config.subtitle ) {
        title = `${project} - ${project_config.subtitle}`;
      } else {
        title = `${project}`;
      }
      html = project_page({
        title,
        files,
        task_array: JSON.stringify( project_config.tasks ),
        risk_array: JSON.stringify( project_config.risks ),
        note_array: JSON.stringify( project_config.notes ),
        action_array: JSON.stringify( project_config.actions ),
        time_data: JSON.stringify( project_config.time_data ),
      });
    }

    res.send( html );
  } catch ( e ) {
    next( e );
  }
});

app.listen( process.env.PORT || 3000, () => {
  console.log( `Listening on http://localhost:${process.env.PORT || 3000}` );
});
