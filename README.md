# Markdowns Links

## Installation

```sh
$ npm install --save 
```

#### Executable configuration

```sh
$ npm run config 
```


## Importing

```javascript
import mdLinks from ''; // ES6
var mdLinks = require(''); // ES5 with npm
```

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

```javascript
$ npm test 
```

## License

ISC

## Author
- Nataly Verdugo 