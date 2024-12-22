import fs from 'fs';
import path from 'path';
import process from 'process';
import getParseFile from './utils/parsers.js';
import diff from './utils/diff.js';
import formatter from './formatters/index.js';
// Получаем абсолютный путь к файлу
const getAbsFilePath = (filepath) => path.resolve(process.cwd(), filepath);
// Получаем расширение файла
const getFileType = (filepath) => path.extname(filepath);
// Парсим файл, находящийся по указанному абсолютному/относительному пути
function getData(filepath) {
  const absFilePath = getAbsFilePath(filepath);
  const fileType = getFileType(absFilePath);
  const file = fs.readFileSync(absFilePath, 'utf8');
  return getParseFile(file, fileType);
}
export default function gendiff(filepath1, filepath2, format) {
  const parseFile1 = getData(filepath1);
  const parseFile2 = getData(filepath2);
  const resultOfDiff = diff(parseFile1, parseFile2);
  return formatter(format)(resultOfDiff);
}
