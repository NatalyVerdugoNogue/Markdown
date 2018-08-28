const { controllerOption, getInfoLinks, mdLinksGen, mdLinksValidate } = require('../lib/controller');

describe('Response controller function', () => {
  describe('When option is --stats', () => {
    test('returns link file information', () => {
      expect.assertions(1);
      return expect(controllerOption(['/home/nataly/.nvm/versions/node/v8.11.2/bin/node',
        '/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/lib/mdlinks.js',
        'file-test.md',
        '--stats']
      )).resolves.toEqual({ Total: 1, Unique: 1 });
    });
  }); (
    describe('When option is undefined', () => {
      test('return path, line, link, text-link', () => {
        expect.assertions(1);
        return expect(controllerOption(['/home/nataly/.nvm/versions/node/v8.11.2/bin/node',
          '/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/lib/mdlinks.js',
          'file-test.md']
        )).resolves.toEqual(['/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/file-test.md: 1 https://nodejs.org/ Node.js']);
      });
    })); (
      describe('When option is --validate', () => {
        test('return error', () => {
          expect(controllerOption(['/home/nataly/.nvm/versions/node/v8.11.2/bin/node',
            '/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/lib/mdlinks.js',
            'file-test.md',
            '--validate']
          )).resolves.toEqual(['/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/file-test.md: 1 https://nodejs.org/ OK 200 Node.js']);
        });
      })); (
        describe('When option is another text', () => {
          test('return path, line, link, text-status, status-code, text-link', () => {
            expect(controllerOption(['/home/nataly/.nvm/versions/node/v8.11.2/bin/node',
              '/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/lib/mdlinks.js',
              'file-test.md',
              '--another']
            )).toBe('Debe ingresar una opción valida');
          });
        }));
});


describe('Get information of links in file', () => {
  test('Show the required information, stats', () => {
    expect(getInfoLinks([{
      path: '/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/file-test.md',
      href: 'https://nodejs.org/',
      text: 'Node.js'
    }]))
      .toEqual({ Total: 1, Unique: 1 });
  });
});


describe('Get information of links in file', () => {
  test('Show the required information, general', () => {
    expect(mdLinksGen([{
      path: '/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/file-test.md',
      href: 'https://nodejs.org/',
      text: 'Node.js',
      line: 1
    }]))
      .toEqual(['/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/file-test.md: 1 https://nodejs.org/ Node.js']);
  });
});


describe('Get information of links in file', () => {
  test('Show the required information, validate', () => {
    expect(mdLinksValidate([{
      path: '/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/file-test.md',
      href: 'https://nodejs.org/',
      text: 'Node.js',
      line: 1,
      status: 200,
      statusText: 'OK'
    }]))
      .toEqual(['/home/nataly/Documentos/Laboratoria/especializacion/markdown/scl-2018-01-FE-markdown/file-test.md: 1 https://nodejs.org/ OK 200 Node.js']);
  });
});