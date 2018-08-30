# Markdowns Links

## Installation

```sh
$ npm install --save md-links-nvn
```
```sh
$ npm install -g https://github.com/NatalyVerdugoNogue/scl-2018-01-FE-markdown 
```

#### Executable configuration

```sh
$ npm run config 
```


## Importing

```javascript
import mdLinks from 'md-links-nvn'; // ES6
var mdLinks = require('md-links-nvn'); // ES5 with npm
```

## Description

When writing the path of a reduction file, and if it contains links, depending on the options entered, the links, the line and the text of all the links in the file will be displayed.


## Usage

### `md-links <path-to-file> [options]`

## Examples

##### Show:
```sh
md-links <path-to-file>
[ '(path): (line) (link) (text-link)' ]
```
##### Example:
```sh
md-links file-test.md
[ '/home/user/dir/file-test.md: 1 https://nodejs.org/ Node.js' ]
```

&nbsp;
### Options

### `--validate`

##### Show:
```sh
md-links <path-to-file> --validate
[ '(path): (line) (link) (text-status) (status-code) (text-link)' ]
```
##### Example:
```sh
md-links file-test.md --validate
[ '/home/user/dir/file-test.md: 1 https://nodejs.org/ OK 200 Node.js' ]
```

&nbsp;
### `--stats`

##### Show:
```sh
md-links <path-to-file> --stats
(path): {Total: (num), Unique: (num)}
```
##### Example:
```sh
md-links file-test.md --stats
/home/user/dir/file-test.md { Total: 1, Unique: 1 }
```


## Tests 
**Clone of git**

```javascript
$ npm test 
```

## License

ISC

## Action plan

[Trello](https://trello.com/b/uSW6xQs4/markdown-links)

## Author
- Nataly Verdugo 