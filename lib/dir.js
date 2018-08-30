#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const getInfoTerminal = () => {
  const args = process.argv;
  getDir(args);
  return args;
};

const getDir = (args) => {
  const initDir = `${args[2]}`;
  if (initDir === undefined) {
    let error = 'Debe escribir un archivo markdown';
    console.error(error);
    return error;
  } else {
    readDirPromise(initDir).then((files) => {
      console.log('files', files);
    });
    return initDir;
  };
};

const readDirPromise = (initDir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(initDir, 'utf8', (error, files) => {
      if (error) {
        return reject(error);
      };
      resolve(files);
      parseDir(files);
      return files;
    });
  });
};


const parseDir = (files) => {
  const prse = files.map((file) => {
    const fileInfo = path.parse(file);
    let info = {
      file: file,
      dir: fileInfo.dir,
      base: fileInfo.base,
      name: fileInfo.name,
      ext: fileInfo.ext
    };
    return info;
  });
  console.log(prse);
  return prse;
};


const recur = (initDir) => {
  
  if (files.length === 0) {
    return [];
  } else {
if(path.parse(files).ext='.md')
return []
  }

}

getInfoTerminal();