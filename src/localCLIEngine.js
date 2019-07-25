let CLIEngine = null;
try {
  // eslint-disable-next-line import/no-dynamic-require, global-require, prefer-destructuring
  CLIEngine = require(`${process.cwd()}/node_modules/eslint`).CLIEngine;
} catch (e) {
  // don't do anything
}

module.exports = CLIEngine;
