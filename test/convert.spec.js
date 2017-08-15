const convert = require('../src/convert');
const fs = require('fs');
const { expect } = require('chai');

describe('cjsx-converter', () => {
  it('converts CJSX into JSX', () => {
    const outPath = './test/fixtures/in.jsx';
    fs.unlinkSync(outPath);
    convert('./test/fixtures/in.cjsx');

    const output = fs.readFileSync(outPath, 'utf8');
    const expected = fs.readFileSync('./test/fixtures/expected.jsx', 'utf8');
    expect(output).to.equal(expected);
  });
});
