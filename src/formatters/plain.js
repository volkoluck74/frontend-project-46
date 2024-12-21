// Функция определяет формат вывода значения свойства в зависимости от типа свойства
function getFormatedValue(objValue) {
  const typeofObjValue = typeof objValue;
  if (typeofObjValue === 'object' && objValue !== null) return '[complex value]';
  if (typeofObjValue === 'string') return `'${objValue}'`;
  return `${objValue}`;
}
// Форматер 'plain
export default function plain(data) {
  const path = [];
  function hiddenfunc(object, currentPath) {
    function cb(acc, obj) {
      if (obj.status === 'added') {
        const formatedValue2 = getFormatedValue(obj.value2);
        return [...acc, `Property '${`${currentPath.join('')}${obj.key}`}' was added with value: ${formatedValue2}`];
      }
      if (obj.status === 'deleted') {
        return [...acc, `Property '${`${currentPath.join('')}${obj.key}`}' was removed`];
      }
      if (obj.status === 'changed') {
        const formatedValue1 = getFormatedValue(obj.value1);
        const formatedValue2 = getFormatedValue(obj.value2);
        return [...acc, `Property '${`${currentPath.join('')}${obj.key}`}' was updated. From ${formatedValue1} to ${formatedValue2}`];
      }
      if (Object.hasOwn(obj, 'childObjects')) {
        return [...acc, hiddenfunc(obj.childObjects, [...currentPath, `${obj.key}.`])];
      }
      return acc;
    }
    return `${object.reduce(cb, '').join('\n').replace(/\n$/m, '')}`;
  }
  return hiddenfunc(data, path);
}
