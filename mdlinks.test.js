const getArchive = require('./lib/mdlinks').getArchive;
const switchAbsolute = require('./lib/mdlinks').switchAbsolute;
const getDataArchive = require('./lib/mdlinks').getDataArchive;
const markdownLinkExtractor = require('./lib/mdlinks').markdownLinkExtractor;
const getLine = require('./lib/mdlinks').getLine;
const getStatusLink = require('./lib/mdlinks').getStatusLink;


describe('File by terminal', () => {
  describe('When entering md file in terminal, return', () => {
    test('return error, due to lack of file', () => {
      expect(getArchive(['/home/nataly/.nvm/versions/node/v8.11.2/bin/node',
        '/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/lib/mdlinks.js']
      )).toBe('error');
    });
  }); (
    describe('When entering md file in terminal, return', () => {
      test('return the file', () => {
        expect(getArchive(['/home/nataly/.nvm/versions/node/v8.11.2/bin/node',
          '/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/lib/mdlinks.js',
          'file-test.md'])).toBe('file-test.md');
      });
    }));
});


describe('All files must be absolute path', () => {
  test('Change the relative path to absolute', () => {
    expect(switchAbsolute('file-test.md'))
      .toBe('/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/file-test.md');
  });
});


describe('Read file markdown', () => {
  test('If enter md file, return text of file', () => {
    expect(getDataArchive('/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/file-test.md'))
      .resolves.toBe(`Lorem ipsum dolor sit amet. [Node.js](https://nodejs.org/)`);
  });
});


describe('Capture links', () => {
  test('Extract links from text from file markdown', () => {
    expect(markdownLinkExtractor('Lorem ipsum dolor sit amet. [Node.js](https://nodejs.org/)',
      '/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/file-test.md'))
      .toEqual([{
        path: '/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/file-test.md',
        href: 'https://nodejs.org/', text: 'Node.js'
      }]);
  });
});


describe('Get the line that contains the link', () => {
  test('show the line number of the link', () => {
    expect(getLine('https://nodejs.org/')).toBe(1);
  });
});


describe('Get links status', () => {
  test('When entering array with liks get status', () => {
    expect(
      getStatusLink([{
        path: '/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/file-test.md',
        href: 'https://nodejs.org/', text: 'Node.js', title: null
      }])
    )
      .resolves.toBe([{
        path: '/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/file-test.md',
        href: 'https://nodejs.org/', text: 'Node.js', status: 200, statusText: 'OK'
      }]);
  });
});