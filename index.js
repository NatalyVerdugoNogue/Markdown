const controllerOption = require('./lib/controller').controllerOption;

const mdLinks = (ruta, opcion) => {
  let arg = undefined;
  if (opcion && opcion.validate) {
    arg = '--validate';
  }
  if (opcion && opcion.stats) {
    arg = '--stats';
  }

  return controllerOption([null, null, ruta, arg]);
};

module.exports = mdLinks;