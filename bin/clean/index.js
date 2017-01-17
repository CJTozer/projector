#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');

const CSS_DIR = path.join( 'static', 'css' );

// Ensure the static CSS directory is present and clean.
fs.ensureDirSync(CSS_DIR);
fs.emptydirSync(CSS_DIR);
