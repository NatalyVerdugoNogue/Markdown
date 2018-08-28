let fs = require('fs');
const path = require('path');
const Marked = require('marked');
const axios = require('axios');
const stringSearcher = require('string-search');


const getInfoTerminal = () => {
  const args = process.argv;
  return args;
};


const getArchive = (args) => {
  const initPath = args[2];
  if (initPath === undefined) {
    let error = 'Debe escribir un archivo markdown';
    console.error(error);
    return error;
  } else {
    return initPath;
  };
};


const switchAbsolute = (initPath) => {
  let archive = path.resolve(initPath);
  return archive;
};


const getDataArchive = (archive) => {
  return new Promise((resolve) => {
    fs.readFile(archive, 'utf-8', (err, data) => {
      if (err) {
        console.log('error:', err);
      } else {
        let markdown = data;
        resolve(markdown);
      };
    });
  });
};


const markdownLinkExtractor = (markdown, archive) => {
  const links = [];
  const renderer = new Marked.Renderer();
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function (href, title, text) {
    links.push({
      path: archive,
      href: href,
      text: text
    });
  };
  renderer.image = function (href, title, text) {
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      path: archive,
      href: href,
      text: text
    });
  };
  Marked(markdown, { renderer: renderer });
  getLine(markdown, links);
  return links;
};


const getLine = (markdown, links) => {
  const linksLine = links.map((link) => {
    return new Promise(resolve => {
      stringSearcher.find(markdown, link.href)
        .then((resultArr) => {
          let lineLinks = {
            path: link.path,
            href: link.href,
            text: link.text,
            line: resultArr[0].line
          }
          resolve(lineLinks);
        }
        ).catch(() => {
          let lineLinks = {
            path: link.path,
            href: link.href,
            text: link.text,
            line: 'NF'
          }
          resolve(lineLinks);
        });
    });
  });
  return Promise.all(linksLine).then(lineLinks => {
    return lineLinks;
  });
};


const getStatusLink = (lineLinks) => {
  const linksValidate = lineLinks.map((link) => {
    return new Promise(resolve => {
      axios.get(link.href)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error.response;
        })
        .then(response => {
          let validate = {
            path: link.path,
            href: link.href,
            text: link.text,
            line: link.line,
            status: response.status,
            statusText: response.statusText
          }
          resolve(validate);
        });
    });
  });
  return Promise.all(linksValidate).then(linksVal => {
    return linksVal;
  });
};


module.exports = {
  getInfoTerminal: getInfoTerminal,
  getArchive: getArchive,
  switchAbsolute: switchAbsolute,
  getDataArchive: getDataArchive,
  markdownLinkExtractor: markdownLinkExtractor,
  getLine: getLine,
  getStatusLink: getStatusLink
};