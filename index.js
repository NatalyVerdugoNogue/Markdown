#!/usr/bin/env node

const getInfoTerminal = require('./lib/mdlinks').getInfoTerminal;
const controllerOption = require('./lib/controller').controllerOption;

const mdLinks = () => {
  const args = getInfoTerminal();
  return controllerOption(args);
};

module.exports = mdLinks();