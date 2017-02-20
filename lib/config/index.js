#!/usr/bin/env node

'use strict';

const path = require( 'path' );
const Duration = require( 'duration-js' );
const Config = require( 'merge-config' );

class config {
  constructor( proj_file ) {
    const self = this;
    self.proj_file = proj_file;

    // Get the global defaults then override with the specified specification.
    self.built_config = new Config();
    self.built_config.file( path.join( __dirname, '..', '..', 'data', proj_file ));
  }

  // Get the set of tasks in the project.
  get tasks() {
    const self = this;
    return ( self.built_config.get().tasks || []).map(( x ) => {
      const done = ( new Duration( x.done )).milliseconds();
      const left = ( new Duration( x.left )).milliseconds();
      // Can only pass numbers/strings as this is passed to the browser as a JSON string.
      return {
        id: x.id,
        name: x.description,
        resource: x.group,
        start: x.start,
        end: x.end,
        duration: done + left,
        progress: Math.floor(( 100 * done ) / ( done + left )),
        dependencies: x.dependencies,
      };
    });
  }

  get notes() {
    const self = this;
    return self.built_config.get().notes || [];
  }

  get risks() {
    const self = this;
    return self.built_config.get().risks || [];
  }

  get actions() {
    const self = this;
    return self.built_config.get().actions || [];
  }

  get time_data() {
    const self = this;
    return self.built_config.get().time_data || [];
  }

  get subtitle() {
    const self = this;
    return self.built_config.get().subtitle;
  }
}

module.exports = config;
