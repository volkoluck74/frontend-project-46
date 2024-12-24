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
      switch (obj.status) {
        case 'added': {
          const formatedValue2 = getFormatedValue(obj.value2);
          return [...acc, `Property '${`${currentPath.join('')}${obj.key}`}' was added with value: ${formatedValue2}`];
        }
        case 'deleted': {
          return [...acc, `Property '${`${currentPath.join('')}${obj.key}`}' was removed`];
        }
        case 'changed': {
          const formatedValue1 = getFormatedValue(obj.value1);
          const formatedValue2 = getFormatedValue(obj.value2);
          return [...acc, `Property '${`${currentPath.join('')}${obj.key}`}' was updated. From ${formatedValue1} to ${formatedValue2}`];
        }
        case 'parentObject': {
          return [...acc, hiddenfunc(obj.childObjects, [...currentPath, `${obj.key}.`])];
        }
        case 'unchanged': {
          return acc;
        }
        default:
          throw new Error('Unknown object status');
      }
    }
    return `${object.reduce(cb, '').join('\n').replace(/\n$/m, '')}`;
  }
  return hiddenfunc(data, path);
}
