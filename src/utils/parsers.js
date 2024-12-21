import yaml from 'js-yaml';
// Функция получает объект в зависимости от переданного формата
export default function getParseFile(file, fileType) {
  if (fileType === '.json') return JSON.parse(file);
  if (fileType === '.yml') return yaml.load(file);
  throw new Error('Unknown format');
}
