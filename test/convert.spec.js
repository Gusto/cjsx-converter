const fs = require('fs');
const { expect } = require('chai');
const util = require('util');
const { basename, extname } = require('path');

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

const fixture = path => `./test/fixtures/${path}`;

const convertFile = async (inPath, outPath) => {
  await exec(`./bin/cjsx-converter.js ${inPath}`);
  return readFile(outPath, 'utf8');
};

const itConverts = (inFile, expectedFile) => {
  const outPath = fixture(`${basename(inFile, extname(inFile))}${extname(expectedFile)}`);

  beforeEach(async () => {
    await removeFile(outPath);
  });

  afterEach(async () => {
    await removeFile(outPath);
  });

  it(`converts ${inFile} successfully`, async () => {
    const [output, expected] = await Promise.all([
      convertFile(fixture(inFile), outPath),
      readFile(fixture(expectedFile), 'utf8'),
    ]);

    expect(output).to.equal(expected);
  }).timeout(5000);
};

describe('cjsx-converter', () => {
  context('when the file contains an unconvertable createReactClass call', function() {
    context('when the project includes ESLint', () => {
      itConverts('createClass.cjsx', 'createClass.expected.jsx');
    });

    context('when the project does not include ESLint', () => {
      beforeEach((done) => {
        fs.rename('node_modules/eslint', 'node_modules/tmp_eslint', done);
      });

      afterEach((done) => {
        fs.rename('node_modules/tmp_eslint', 'node_modules/eslint', done);
      });

      itConverts('createClass.cjsx', 'createClass.noESLint.expected.jsx');
    });
  });

  context('when the file contains a createReactClass call that can be converted to a class', function() {
    itConverts('class.cjsx', 'class.expected.jsx');

    itConverts('pureRenderMixin.cjsx', 'pureRenderMixin.expected.jsx');
  });

  context('when the file contains a createReactClass call that can be converted to a function', function() {
    itConverts('function.cjsx', 'function.expected.jsx');

    itConverts('templateLiteral.cjsx', 'templateLiteral.expected.jsx');
  });

  context('when the file contains no CJSX', function() {
    itConverts('plainCoffee.coffee', 'plainCoffee.expected.js');
  });
});
