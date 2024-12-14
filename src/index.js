import fs from 'fs';
import path from 'path';
import process from 'process';

// Функция получает абсолютный путь
const getAbsFilePath = (filepath) => path.resolve(process.cwd(), filepath);
// Функция получает тип файла
const getFileType = (filepath) => path.extname(filepath);
// Функция получает объект в зависимости от переданного формата
const getParseFile = (file, fileType) => {
  if (fileType === '.json') return JSON.parse(file);
  return null;
};
// Функция выводит результат сравнения двух объектов
function diff(obj1, obj2) {
  // Уровень вложенности
  const level = 1;
  // Отступ начала строки
  const separator = '  ';
  function hiddenDiff(first, second, lvl) {
    const firstKeys = Object.keys(first);
    const secondKeys = Object.keys(second);
    const keys = firstKeys.concat(secondKeys);
    // Фильтруем уникальные значения объединенного массива и сортируем их
    const uniqueKeys = keys.reduce((acc, key) => {
      if (acc.includes(key)) return acc;
      return [...acc, key];
    }, []).sort();
    function cb(acc, key) {
      // Если значение ключа не является объектом
      let newAcc = acc;
      if (typeof first[key] !== 'object' && typeof second[key] !== 'object') {
        if (Object.hasOwn(first, key) && Object.hasOwn(second, key) && first[key] === second[key]) newAcc += `${(separator).repeat(level)}  ${key}: ${first[key]}\n`;
        if (Object.hasOwn(first, key) && Object.hasOwn(second, key) && first[key] !== second[key]) newAcc += `${(separator).repeat(level)}- ${key}: ${first[key]}\n`;
        if (Object.hasOwn(first, key) && Object.hasOwn(second, key) && first[key] !== second[key]) newAcc += `${(separator).repeat(level)}+ ${key}: ${second[key]}\n`;
        if (Object.hasOwn(first, key) && !Object.hasOwn(second, key)) newAcc += `${(separator).repeat(lvl)}- ${key}: ${first[key]}\n`;
        if (!Object.hasOwn(first, key) && Object.hasOwn(second, key)) newAcc += `${(separator).repeat(lvl)}+ ${key}: ${second[key]}\n`;
      } else {
        newAcc += `${(separator).repeat(lvl)}  ${key}: {\n`;
        newAcc += `${hiddenDiff(first[key], second[key], lvl + 1)}`;
        newAcc += `${(separator).repeat(lvl)}  }\n`;
      }
      return newAcc;
    }
    return `${uniqueKeys.reduce(cb, '')}`;
  }
  return `{\n${hiddenDiff(obj1, obj2, level)}}\n`;
}

export default function gendiff(filepath1, filepath2) {
  const absFilepath1 = getAbsFilePath(filepath1);
  const absFilepath2 = getAbsFilePath(filepath2);
  const fileType1 = getFileType(absFilepath1);
  const fileType2 = getFileType(absFilepath2);
  const file1 = fs.readFileSync(absFilepath1, 'utf8');
  const file2 = fs.readFileSync(absFilepath2, 'utf8');
  const parseFile1 = getParseFile(file1, fileType1);
  const parseFile2 = getParseFile(file2, fileType2);
  return diff(parseFile1, parseFile2);
}
