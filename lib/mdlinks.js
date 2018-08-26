#!/usr/bin/env node

let fs = require('fs');
const Marked = require('marked');
const axios = require('axios');


const getInfoTerminal = () => {
  const args = process.argv;
  getArchive(args);
};


const getArchive = (args) => {
  if (args[2] === undefined) {
    console.error('Debe escribir un archivo markdown')
    return 'error';
  } else {
    const archive = args[2];
    getDataArchive(archive).then((markdown) => {
      markdownLinkExtractor(markdown, archive);
    });
    return archive
  }
}


const getDataArchive = (archive) => {
  return new Promise((resolve) => {
    fs.readFile(archive, 'utf-8', (err, data) => {
      if (err) {
        console.log('error:', err);
      } else {
        let markdown = data;
        resolve(markdown);
      }
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
  console.log(links);
  getStatusLink(links);
  return links;
};


const getStatusLink = (links) => {

  const linksValidate = links.map((link) => {
    return new Promise(resolve => {
      axios.get(link.href)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return error.response;
        })
        .then(response => {
          let validate = {
            path: link.path,
            href: link.href,
            text: link.text,
            status: response.status,
            statusText: response.statusText
          }
          resolve(validate);
        });
    });
  });
  return Promise.all(linksValidate).then(links => {
    console.info(links)
  });
};


getInfoTerminal();


module.exports = {
  getArchive: getArchive,
  getDataArchive: getDataArchive,
  markdownLinkExtractor: markdownLinkExtractor,
  getStatusLink: getStatusLink
};