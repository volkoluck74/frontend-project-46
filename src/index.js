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

export default function gendiff (filepath1, filepath2) {
    const absFilepath1 = getAbsFilePath(filepath1);
    const absFilepath2 = getAbsFilePath(filepath2);
    const fileType1 = getFileType(absFilepath1);
    const fileType2 = getFileType(absFilepath2);
    const file1 = fs.readFileSync(absFilepath1,'utf8');
    const file2 = fs.readFileSync(absFilepath2,'utf8');
    const parseFile1 = getParseFile (file1, fileType1);
    const parseFile2 = getParseFile (file2, fileType2);
    if (parseFile1 === parseFile2) return 'Files equal';
    return `files not equal`;
}

