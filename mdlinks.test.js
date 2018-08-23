const getArchive = require('./lib/mdlinks').getArchive;
const getDataArchive = require('./lib/mdlinks').getDataArchive;


describe('File by terminal', () => {
  describe('When entering md file in terminal, return', () => {
    test('return error, due to lack of file', () => {
      expect(getArchive(['/home/nataly/.nvm/versions/node/v8.11.2/bin/node',
        '/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/lib/mdlinks.js'])).toBe('error');
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


describe('Read file markdown', () => {
  test('If enter md file, return text of file', () => {
    expect(getDataArchive('file-test.md')).resolves.toBe(`Lorem ipsum dolor sit amet. [Node.js](https://nodejs.org/)`);
  });
});
