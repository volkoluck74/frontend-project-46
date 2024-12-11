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
function diff (obj1, obj2) {
    //Уровень вложенности
    let level = 1;
    //Отступ начала строки
    const separator = ' ';
    function hiddenDiff (obj1, obj2, level) {
        const obj1Keys = Object.keys(obj1);
        const obj2Keys = Object.keys(obj2);
        const keys = obj1Keys.concat(obj2Keys);
        //Фильтруем уникальные значения объединенного массива и сортируем их
        const uniqueKeys = keys.reduce((acc, key) => {
        if (acc.includes(key)) return acc; 
            return [...acc, key]; 
        }, []).sort();
        function cb (acc, key) {
            // Если значение ключа не является объектом
            if (typeof obj1[key] !== 'object' && typeof obj2[key] !== 'object') {
                if (Object.hasOwn(obj1,key) && Object.hasOwn(obj2,key) && obj1[key] === obj2[key]) acc += `${(separator).repeat(level)}  ${key}: ${obj1[key]}\n`;
                if (Object.hasOwn(obj1,key) && Object.hasOwn(obj2,key) && obj1[key] !== obj2[key]) acc += `${(separator).repeat(level)}- ${key}: ${obj1[key]}\n`;
                if (Object.hasOwn(obj1,key) && Object.hasOwn(obj2,key) && obj1[key] !== obj2[key]) acc += `${(separator).repeat(level)}+ ${key}: ${obj2[key]}\n`;
                if (Object.hasOwn(obj1,key) && !Object.hasOwn(obj2,key)) acc += `${(separator).repeat(level)}- ${key}: ${obj1[key]}\n`;
                if (!Object.hasOwn(obj1,key) && Object.hasOwn(obj2,key)) acc += `${(separator).repeat(level)}+ ${key}: ${obj2[key]}\n`;
            }
            // Если значение ключа - объект
            else {
                acc +=  `${(separator).repeat(level)}  ${key}: {\n`;
                level += 1;
                acc += `${hiddendiff(obj1[key], obj2[key],level)}`;
                level -= 1;
                acc += `${(separator).repeat(level)}  }\n`;
            }
            return acc;
        }
        return `${uniqueKeys.reduce(cb, '')}`;
    }
    return `{\n${hiddenDiff(obj1,obj2,level)}}`;
}

export default function gendiff (filepath1, filepath2) {
    const absFilepath1 = getAbsFilePath(filepath1);
    const absFilepath2 = getAbsFilePath(filepath2);
    const fileType1 = getFileType(absFilepath1);
    const fileType2 = getFileType(absFilepath2);
    const file1 = fs.readFileSync(absFilepath1,'utf8');
    const file2 = fs.readFileSync(absFilepath2,'utf8');
    const parseFile1 = getParseFile (file1, fileType1);
    const parseFile2 = getParseFile (file2, fileType2);
    return diff(parseFile1,parseFile2);
}

