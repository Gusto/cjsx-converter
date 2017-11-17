const fs = require('fs');
const util = require('util');
const { dirname, basename, extname } = require('path');
const assert = require('assert');
const cjsxTransform = require('cjsx-codemod/transform');
const decaffeinate = require('decaffeinate');
const jscodeshift = require('jscodeshift');
const createElementTransform = require('react-codemod/transforms/create-element-to-jsx');
const reactClassTransform = require('./reactClassTransform');
const pureComponentTransform = require('./pureComponentTransform');
const prettier = require('prettier');
const CLIEngine = require('./localCLIEngine');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const runCodemod = (codemod, options = {}, nullIfUnchanged = false) => ({ source, path }) => ({
  source: codemod(
    { path, source },
    { j: jscodeshift, jscodeshift, stats: () => {} },
    options,
  ) || (!nullIfUnchanged && source),
  path,
});

const runTransform = transform => ({ source, path }) => ({
  source: transform(source),
  path,
});

const cjsxToCoffee = runCodemod(cjsxTransform);

const coffeeToJs = runTransform(source =>
  decaffeinate.convert(source, {
    useJSModules: true,
    looseJSModules: true,
  }).code
);

const convertToCreateElement = runCodemod(createElementTransform, {}, true);

const jsToJsx = ({ source, path }) => {
  const jsxSource = convertToCreateElement({ source, path }).source;
  const ext = jsxSource ? 'jsx' : 'js';

  return {
    source: jsxSource || source,
    path: `${dirname(path)}/${basename(path, extname(path))}.${ext}`,
  };
};

const convertToClass = runCodemod(reactClassTransform);

const convertToFunctional = runCodemod(pureComponentTransform, {
  useArrows: true,
  destructuring: true
});

const prettify = runTransform(source =>
  prettier.format(source, {
    singleQuote: true,
    trailingComma: 'all',
  })
);

const lintFix = ({ source, path }) => {
  if (CLIEngine) {
    const engine = new CLIEngine({ fix: true, cwd: process.cwd() });
    const { results } = engine.executeOnText(source, path);
    assert(results.length === 1, 'Unexpected ESLint results');
    source = results[0].output || source;
  }

  return { source, path };
};

const runSteps = (...fns) =>
  fns.reduce((prevFn, nextFn) =>
    value => nextFn(prevFn(value)),
    value => value
  );

const convert = runSteps(
  cjsxToCoffee,
  coffeeToJs,
  jsToJsx,
  convertToClass,
  convertToFunctional,
  prettify,
  lintFix,
);

module.exports = async function convertFile(coffeePath) {
  const { source, path } = convert({
    source: await readFile(coffeePath, 'utf8'),
    path: coffeePath,
  });

  await writeFile(path, source);
};
