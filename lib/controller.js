const { getArchive, switchAbsolute, getDataArchive, markdownLinkExtractor, getLine, getStatusLink } = require('./mdlinks');


const controllerOption = (args) => {
  if (args[3] === '--stats') {
    let initPath = getArchive(args);
    let archive = switchAbsolute(initPath);
    return getDataArchive(archive).then((markdown) => {
      let links = markdownLinkExtractor(markdown, archive);
      let infoLinks = getInfoLinks(links);
      console.log(archive, infoLinks);
      return infoLinks;
    });
  }
  else if (args[3] === undefined) {
    let initPath = getArchive(args);
    let archive = switchAbsolute(initPath);
    return getDataArchive(archive).then((markdown) => {
      let links = markdownLinkExtractor(markdown, archive);
      return getLine(markdown, links).then((lineLinks) => {
        return mdLinksGen(lineLinks);
      });
    });
  }
  else if (args[3] === '--validate') {
    let initPath = getArchive(args);
    let archive = switchAbsolute(initPath);
    return getDataArchive(archive).then((markdown) => {
      let links = markdownLinkExtractor(markdown, archive);
      return getLine(markdown, links).then((lineLinks) => {
        return getStatusLink(lineLinks).then((linksVal) => {
          return mdLinksValidate(linksVal);
        });
      });
    });
  }
  else {
    const error = 'Debe ingresar una opción valida';
    console.error(error);
    return error;
  };
};


const getInfoLinks = (links) => {
  let hrefLinks = links.map(link => link.href);
  let unique = [...new Set(hrefLinks)];
  let infoLinks = {
    Total: links.length,
    Unique: unique.length
  };
  return infoLinks;
};


const mdLinksGen = (lineLinks) => {
  let showGeneral = lineLinks.map((link) => {
    return `${link.path}: ${link.line} ${link.href} ${link.text}`
  });
  console.log(showGeneral);
  return showGeneral;
};


const mdLinksValidate = (linksVal) => {
  let showValidate = linksVal.map((link) => {
    return `${link.path}: ${link.line} ${link.href} ${link.statusText} ${link.status} ${link.text}`
  });
  console.log(showValidate);
  return showValidate;
};


module.exports = {
  controllerOption: controllerOption,
  getInfoLinks: getInfoLinks,
  mdLinksGen: mdLinksGen,
  mdLinksValidate: mdLinksValidate
}