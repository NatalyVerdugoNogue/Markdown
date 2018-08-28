const { getArchive, switchAbsolute, getDataArchive, markdownLinkExtractor, getLine, getStatusLink } = require('./mdlinks');


const controllerOption = (args) => {
  if (args[3] === '--stats') {
    let initPath = getArchive(args);
    let archive = switchAbsolute(initPath);
    getDataArchive(archive).then((markdown) => {
      let links = markdownLinkExtractor(markdown, archive);
      let infoLinks = getInfoLinks(links);
      console.log(archive, infoLinks);
      return infoLinks;
    });
  }
  else if (args[3] === undefined) {
    let initPath = getArchive(args);
    let archive = switchAbsolute(initPath);
    getDataArchive(archive).then((markdown) => {
      let links = markdownLinkExtractor(markdown, archive);
      getLine(markdown, links).then((lineLinks) => {
        return mdLinksGen(lineLinks);
      });
    });
  }
  else if (args[3] === '--validate') {
    let initPath = getArchive(args);
    let archive = switchAbsolute(initPath);
    getDataArchive(archive).then((markdown) => {
      let links = markdownLinkExtractor(markdown, archive);
      getLine(markdown, links).then((lineLinks) => {
        getStatusLink(lineLinks).then((linksVal) => {
          return mdLinksValidate(linksVal);
        });
      });
    });
  }
  else {
    console.error('Debe ingresar una opción valida')
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
  })
  console.log('md-Links', showGeneral);
};


const mdLinksValidate = (linksVal) => {
  let showValidate = linksVal.map((link) => {
    return `${link.path}: ${link.line} ${link.href} ${link.statusText} ${link.status} ${link.text}`
  })
  console.log('md-Links', showValidate);
};


module.exports = controllerOption;