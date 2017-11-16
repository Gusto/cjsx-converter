const fs = require('fs');
const { dirname, basename } = require('path');
const cjsxTransform = require('cjsx-codemod/transform');
const decaffeinate = require('decaffeinate');
const jscodeshift = require('jscodeshift');
const createElementTransform = require('react-codemod/transforms/create-element-to-jsx');
const reactClassTransform = require('./reactClassTransform');
const pureComponentTransform = require('./pureComponentTransform');
const prettier = require('prettier');
const CLIEngine = require('./localCLIEngine');

const runCodemod = (codemod, options = {}) => ({ source, path }) => ({
  source: codemod(
    { path, source },
    { j: jscodeshift, jscodeshift, stats: () => {} },
    options,
  ) || source,
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

const convertToCreateElement = runCodemod(createElementTransform);

const jsToJsx = ({ source, path }) => ({
  source: convertToCreateElement({ source, path }).source,
  path: `${dirname(path)}/${basename(path, '.cjsx')}.jsx`,
});

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
    const report = engine.executeOnText(source, path);
    CLIEngine.outputFixes(report);
  } else {
    fs.writeFileSync(path, source);
  }
};

const runSteps = (...fns) =>
  fns.reduce((prevFn, nextFn) =>
    value => nextFn(prevFn(value)),
    value => value
  );

module.exports = function convert(cjsxPath) {
  runSteps(
    cjsxToCoffee,
    coffeeToJs,
    jsToJsx,
    convertToClass,
    convertToFunctional,
    prettify,
    lintFix,
  )({
    source: fs.readFileSync(cjsxPath, 'utf8'),
    path: cjsxPath,
  });
};
