#!/usr/bin/env node

const getInfoTerminal = require('./lib/mdlinks').getInfoTerminal;
const controllerOption = require('./lib/controller');

const mdLinks = () => {
  let args = getInfoTerminal();
  return controllerOption(args);
};

module.exports = mdLinks();