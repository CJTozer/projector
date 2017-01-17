#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CSS_DIR = path.join('static', 'css');

try {
  fs.rmdirSync(CSS_DIR);
} catch (e) {}
fs.mkdirSync(CSS_DIR);
