const fs = require('fs');
const { expect } = require('chai');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const unlink = util.promisify(fs.unlink);
const readFile = util.promisify(fs.readFile);

const removeFile = async (path) => {
  try {
    await unlink(path);
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e;
    }
  }
};

const convertFile = async (inPath, outPath) => {
  await exec(`./bin/cjsx-converter.js ${inPath}`);
  return readFile(outPath, 'utf8');
};

const itConverts = (expectedFile) => {
  const outPath = './test/fixtures/in.jsx';

  beforeEach(async () => {
    await removeFile(outPath);
  });

  afterEach(async () => {
    await removeFile(outPath);
  });

  it('converts CJSX into JSX', async () => {
    const [output, expected] = await Promise.all([
      convertFile('./test/fixtures/in.cjsx', outPath),
      readFile(`./test/fixtures/${expectedFile}`, 'utf8'),
    ]);

    expect(output).to.equal(expected);
  }).timeout(5000);
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
