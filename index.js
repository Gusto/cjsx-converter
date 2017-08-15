const program = require('commander');
const convert = require('./src/convert');

program.parse(process.argv);

const cjsxPath = program.args[0];

convert(cjsxPath);
