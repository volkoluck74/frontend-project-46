import fs from 'fs';
import path from 'path';
import process from 'process';
import getParseFile from './utils/parsers.js';
import diff from './utils/diff.js';
import formatter from './formatters/index.js';

const getAbsFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileType = (filepath) => path.extname(filepath);
export default function gendiff(filepath1, filepath2, format) {
  const absFilepath1 = getAbsFilePath(filepath1);
  const absFilepath2 = getAbsFilePath(filepath2);
  const fileType1 = getFileType(absFilepath1);
  const fileType2 = getFileType(absFilepath2);
  const file1 = fs.readFileSync(absFilepath1, 'utf8');
  const file2 = fs.readFileSync(absFilepath2, 'utf8');
  const parseFile1 = getParseFile(file1, fileType1);
  const parseFile2 = getParseFile(file2, fileType2);
  const resultOfDiff = diff(parseFile1, parseFile2);
  return formatter(format)(resultOfDiff);
}
