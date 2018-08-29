#!/usr/bin/env node

const getInfoTerminal = () => {
  const args = process.argv;
  getDir(args);
  return args;
};

const getDir = (args) => {
  const initDir = args[2];
  if (initDir === undefined) {
    let error = 'Debe escribir un archivo markdown';
    console.error(error);
    return error;
  } else {
    readDirPromise(initDir);
    return initDir;
  };
};

const readDirPromise = (initDir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(initDir, (error, files) => {
      if (error) {
        return reject(error);
      };
      console.log('files', files);
      return resolve(files);
    });
  });
};

getInfoTerminal();