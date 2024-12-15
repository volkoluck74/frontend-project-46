import fs from 'fs';
import path from 'path';
import process from 'process';
import getParseFile from './utils/parsers.js';

function stringfy(data, symb = ' ', spacer = 1) {
  if (typeof data !== 'object') return data.toString();
  const saveSpaceCount = spacer;
  function hiddenfunc(obj, replacer, spaceCount) {
    let cnt = 1;
    function cb(acc, key, index, array) {
      let newAcc = acc;
      if (obj[key] === null) {
        newAcc += `${replacer.repeat(spaceCount)}null: null`;
        if (index !== array.length - 1) newAcc += '\n';
      }
      if (typeof obj[key] !== 'object') {
        newAcc += `${replacer.repeat(spaceCount)}${key}: ${obj[key]}`;
        if (index !== array.length - 1) newAcc += '\n';
      }
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        newAcc += `${replacer.repeat(spaceCount)}${key}: ${hiddenfunc(obj[key], replacer, spaceCount + saveSpaceCount)}`;
        if (spaceCount >= saveSpaceCount) newAcc += '\n';
        newAcc += `${replacer.repeat(spaceCount)}}`;
      }
      return newAcc;
    }
    if (typeof obj !== 'object') return obj.toString();
    if (typeof obj === 'object' && obj !== null) {
      let result = cnt === 1 ? '{\n' : '{';
      result += Object.keys(obj).reduce(cb, '');
      cnt += 1;
      return result;
    }
    return 'null';
  }
  if (data === null) return `${hiddenfunc(data, symb, spacer)}`;
  return `${hiddenfunc(data, symb, spacer)}\n${symb.repeat(spacer - 1)}}`;
}
// Функция получает абсолютный путь
const getAbsFilePath = (filepath) => path.resolve(process.cwd(), filepath);
// Функция получает тип файла
const getFileType = (filepath) => path.extname(filepath);
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
      if ((typeof first[key] !== 'object' || typeof second[key] !== 'object') || second[key] == null || first[key] == null) {
        if (Object.hasOwn(first, key) && Object.hasOwn(second, key) && first[key] === second[key]) newAcc += `${(separator).repeat(lvl)}  ${key}: ${stringfy(first[key], '  ', lvl + 1)}\n`;
        if (Object.hasOwn(first, key) && Object.hasOwn(second, key) && first[key] !== second[key]) newAcc += `${(separator).repeat(lvl)}- ${key}: ${stringfy(first[key], '  ', lvl + 1)}\n`;
        if (Object.hasOwn(first, key) && Object.hasOwn(second, key) && first[key] !== second[key]) newAcc += `${(separator).repeat(lvl)}+ ${key}: ${stringfy(second[key], '  ', lvl + 1)}\n`;
        if (Object.hasOwn(first, key) && !Object.hasOwn(second, key)) newAcc += `${(separator).repeat(lvl)}- ${key}: ${stringfy(first[key], '  ', lvl + 1)}\n`;
        if (!Object.hasOwn(first, key) && Object.hasOwn(second, key)) newAcc += `${(separator).repeat(lvl)}+ ${key}: ${stringfy(second[key], '  ', lvl + 1)}\n`;
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
