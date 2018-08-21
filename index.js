#! / usr / bin / env node

let fs = require('fs');
const Marked = require('marked');


const getArchive = () => {
  return new Promise((resolve) => {
    fs.readFile('readme-laboratoria.md', 'utf-8', (err, data) => {
      if (err) {
        console.log('error:', err);
      } else {
        // console.log(data);
        let markdown = data;
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
      // text: text,
      // title: title,
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
  console.log('total:', links.length);
  console.log('links:', links);
  return links;
};

const obtener = () => {
  getArchive().then((markdown) => {
    markdownLinkExtractor(markdown);
  });
};

obtener()

// console.log('links', getArchive());


// // // exports.arch = markdown;
// // // exports.mdlinks = markdownLinkExtractor(markdown);