const fs = require('fs');
const { dirname, basename } = require('path');
const cjsxTransform = require('cjsx-codemod/transform');
const decaffeinate = require('decaffeinate');
const jscodeshift = require('jscodeshift');
const createElementTransform = require('react-codemod/transforms/create-element-to-jsx');
const prettier = require('prettier');
const CLIEngine = require('./localCLIEngine');

function runTransform(transform, source, path) {
  return transform({ path, source }, { j: jscodeshift, jscodeshift, stats: () => {} }, {});
}

module.exports = function convert(cjsxPath) {
  const cjsxSource = fs.readFileSync(cjsxPath, 'utf8');
  const coffeeSource = runTransform(cjsxTransform, cjsxSource, cjsxPath);

  const jsxPath = `${dirname(cjsxPath)}/${basename(cjsxPath, '.cjsx')}.jsx`;
  const jsSource = decaffeinate.convert(coffeeSource, { preferConst: true }).code;
  const jsxSource = prettier.format(
    runTransform(createElementTransform, jsSource, jsxPath) || jsSource,
    { singleQuote: true }
  );

  if (CLIEngine) {
    const engine = new CLIEngine({ fix: true, cwd: process.cwd() });
    const report = engine.executeOnText(jsxSource, jsxPath);
    CLIEngine.outputFixes(report);
  } else {
    fs.writeFileSync(jsxPath, jsxSource);
  }
};
