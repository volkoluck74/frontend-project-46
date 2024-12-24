import yaml from 'js-yaml';
// Функция получает объект в зависимости от переданного формата
export default function getParseFile(file, fileType) {
  switch (fileType) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
    case '.yaml':
      return yaml.load(file);
    default:
      throw new Error('Unknown format');
  }
}
