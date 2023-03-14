#!/usr/bin/env node
const program = require('commander');

const createCommands = require('./lib/core/create');

program.version(require('./package.json').version);

createCommands();

program.parse(process.argv);
