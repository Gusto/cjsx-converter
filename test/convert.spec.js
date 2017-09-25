const fs = require('fs');
const { expect } = require('chai');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const unlink = util.promisify(fs.unlink);
const readFile = util.promisify(fs.readFile);

const itConverts = (expectedFile) => {
  it('converts CJSX into JSX', async () => {
    const outPath = './test/fixtures/in.jsx';
    try {
      await unlink(outPath);
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw e;
      }
    }

    await exec('./bin/cjsx-converter.js ./test/fixtures/in.cjsx');
    const [output, expected] = await Promise.all(
      [readFile(outPath, 'utf8'), readFile(`./test/fixtures/${expectedFile}`, 'utf8')],
    );

    expect(output).to.equal(expected);
  });
};

describe('cjsx-converter', () => {
  context('when the project includes ESLint', () => {
    itConverts('expected.jsx');
  });

  context('when the project does not include ESLint', () => {
    beforeEach((done) => {
      fs.rename('node_modules/eslint', 'node_modules/tmp_eslint', done);
    });

    afterEach((done) => {
      fs.rename('node_modules/tmp_eslint', 'node_modules/eslint', done);
    });

    itConverts('expected.noESLint.jsx');
  });
});
