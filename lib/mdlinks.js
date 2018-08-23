#!/usr/bin/env node

let fs = require('fs');
const Marked = require('marked');


const getInfoTerminal = () => {
  const args = process.argv;
  getArchive(args);
};


const getArchive = (args) => {
  console.log('args', args);

  if (args[2] === undefined) {
    console.error('Debe escribir un archivo markdown')
    return 'error';
  } else {
    const archive = args[2];
    getDataArchive(archive).then((markdown) => {
      markdownLinkExtractor(markdown);
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
        console.log('markdown', markdown);
        resolve(markdown);
      }
    });
  });
};


const markdownLinkExtractor = (markdown) => {
  const links = [];

  const renderer = new Marked.Renderer();
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function (href, title, text) {
    links.push({
      href: href,
      text: text,
      title: title,
    });
  };
  renderer.image = function (href, title, text) {
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      text: text,
      title: title,
    });
  };
  Marked(markdown, { renderer: renderer });
  console.log(links);
  return links;
};

getInfoTerminal();

module.exports = {
  getArchive: getArchive,
  getDataArchive: getDataArchive
};