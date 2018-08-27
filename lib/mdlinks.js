#!/usr/bin/env node

let fs = require('fs');
const path = require('path');
const Marked = require('marked');
const axios = require('axios');
const stringSearcher = require('string-search');


const getInfoTerminal = () => {
  const args = process.argv;
  getArchive(args);
};


const getArchive = (args) => {
  if (args[2] === undefined) {
    console.error('Debe escribir un archivo markdown')
    return 'error';
  } else {
    const initPath = args[2];
    const optionArgs = args[3];
    switchAbsolute(initPath, optionArgs);
    return initPath
  };
};


const switchAbsolute = (initPath, optionArgs) => {
  let archive = path.resolve(initPath);
  getDataArchive(archive).then((markdown) => {
    markdownLinkExtractor(markdown, archive, optionArgs);
  });
  return archive
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


const markdownLinkExtractor = (markdown, archive, optionArgs) => {
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
  if (optionArgs === '--stats') {
    mdLinksStats(links)
  } else { getLine(markdown, links, optionArgs); }
  return links;
};


mdLinksStats = (links) => {
  console.log('mdLinksStats', links.length);
  return links;
};


const getLine = (markdown, links, optionArgs) => {
  const linksLine = links.map((link) => {
    return new Promise((resolve, reject) => {
      stringSearcher.find(markdown, link.href)
        .then((resultArr) => {
          let lineLinks = {
            path: link.path,
            href: link.href,
            text: link.text,
            line: resultArr[0].line
          }
          resolve(lineLinks)
        }
        ).catch(() => {
          let lineLinks = {
            path: link.path,
            href: link.href,
            text: link.text,
            line: 'none'
          }
          resolve(lineLinks)
        });
    });
  });
  return Promise.all(linksLine).then(lineLinks => {
    if (optionArgs === '--validate') {
      getStatusLink(lineLinks);
    } else {
      mdLinksGen(lineLinks);
    };
  });
};


const mdLinksGen = (lineLinks) => {
  console.log('mdLinksGen', lineLinks);
  return lineLinks;
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
    mdLinksValidate(linksVal);
  });
};


mdLinksValidate = (linksVal) => {
  console.log('mdLinksValidate', linksVal);
  return linksVal;
};

getInfoTerminal();


module.exports = {
  getArchive: getArchive,
  switchAbsolute: switchAbsolute,
  getDataArchive: getDataArchive,
  markdownLinkExtractor: markdownLinkExtractor,
  getLine: getLine,
  getStatusLink: getStatusLink
};