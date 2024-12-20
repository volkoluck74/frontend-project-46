// Функция определяет формат вывода значения свойства в зависимости от типа свойства
function getFormatedValue(objValue) {
  if (typeof objValue === 'object' && objValue !== null) return '[complex value]';
  if (typeof objValue === 'boolean' || objValue === null || typeof objValue === 'number') return `${objValue}`;
  return `'${objValue}'`;
}
// Форматер 'plain
export default function plain(data) {
  let path = '';
  function cb(acc, obj) {
    let newAcc = acc;
    const currentPath = path === '' ? `${obj.key}` : `${path}${obj.key}`;
    if (obj.status === 'added') {
      const formatedValue2 = getFormatedValue(obj.value2);
      newAcc += `Property '${currentPath}' was added with value: ${formatedValue2}\n`;
    }
    if (obj.status === 'deleted') {
      newAcc += `Property '${currentPath}' was removed\n`;
    }
    if (obj.status === 'changed') {
      const formatedValue1 = getFormatedValue(obj.value1);
      const formatedValue2 = getFormatedValue(obj.value2);
      newAcc += `Property '${currentPath}' was updated. From ${formatedValue1} to ${formatedValue2}\n`;
    }
    if (Object.hasOwn(obj, 'childObjects')) {
      const savedPath = path;
      path += `${obj.key}.`;
      newAcc += `${obj.childObjects.reduce(cb, '')}`;
      path = savedPath;
    }
    return newAcc;
  }
  return `${data.reduce(cb, '')}`;
}
