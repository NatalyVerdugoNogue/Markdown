const mdLinks = require('.');

mdLinks('readme-laboratoria.md', { stats: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
    console.log(links);
  })
  .catch(console.error);

mdLinks('readme-laboratoria.md', { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
    console.log(links);
  })
  .catch(console.error);

mdLinks('readme-laboratoria.md')
  .then(links => {
    // => [{ href, text, file, status, ok }]
    console.log(links);
  })
  .catch(console.error);