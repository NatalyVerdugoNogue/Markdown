#! / usr / bin / env node

const mdLinks = require("md-links");
const markdown=require('./');
const links = require('./index.js');

mdLinks("./some/example.md")
  .then(links => {
    console.log(links);

  })
  .catch(console.error);


  console.log(cli.flags.mdlinks ? markdown.mdlinks.join('\n'):markdown);
  