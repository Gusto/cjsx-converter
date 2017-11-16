const fs = require('fs');
const { dirname, basename } = require('path');
const cjsxTransform = require('cjsx-codemod/transform');
const decaffeinate = require('decaffeinate');
const jscodeshift = require('jscodeshift');
const createElementTransform = require('react-codemod/transforms/create-element-to-jsx');
const prettier = require('prettier');
const CLIEngine = require('./localCLIEngine');

const runTransform = (transform, source, path) => transform(
  { path, source },
  { j: jscodeshift, jscodeshift, stats: () => {} },
  {}
);

const cjsxToCoffee = (source, path) => runTransform(cjsxTransform, source, path);
const coffeeToJs = (source) => decaffeinate.convert(source, {
  useJSModules: true,
  looseJSModules: true,
}).code;
const jsToJsx = (source, path) => runTransform(createElementTransform, source, path) || source;
const pretty = (source) => prettier.format(source, { singleQuote: true });
const lintFix = (source, path) => {
  if (CLIEngine) {
    const engine = new CLIEngine({ fix: true, cwd: process.cwd() });
    const report = engine.executeOnText(source, path);
    CLIEngine.outputFixes(report);
  } else {
    fs.writeFileSync(path, source);
  }
};

module.exports = function convert(cjsxPath) {
  const jsxPath = `${dirname(cjsxPath)}/${basename(cjsxPath, '.cjsx')}.jsx`;
  const cjsxSource = fs.readFileSync(cjsxPath, 'utf8');

  const coffeeSource = cjsxToCoffee(cjsxSource);
  const jsSource = coffeeToJs(coffeeSource);
  const jsxSource = pretty(
    jsToJsx(jsSource, jsxPath)
  );

  lintFix(jsxSource, jsxPath);
};
