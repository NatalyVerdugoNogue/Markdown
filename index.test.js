const getDataArchive = require('./index');
test('if enter md file, return text of file', () => {
  expect(getDataArchive('file-test.md')).resolves.toBe(`[Node.js](https://nodejs.org/)`);
});

