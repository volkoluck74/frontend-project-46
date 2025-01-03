#!/usr/bin/env node
import { program } from 'commander';
import gendiff from '../index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    console.log(gendiff(filepath1, filepath2, options.format));
  });
program.parse();
