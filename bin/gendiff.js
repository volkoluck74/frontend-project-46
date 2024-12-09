#!/usr/bin/env node

import {program} from 'commander';
program
        .name('gendiff')
        .description('Compares two configuration files and shows a difference.')
        .version('1.0.0','-V, --version', 'output the version number')
        .argument('<filepath1>')
        .argument('<filepath2>')
        .option('-f, --format [type]', 'output format')
        .helpOption('-h, --help','output usage information');
program.parse();