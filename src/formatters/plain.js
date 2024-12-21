// Функция определяет формат вывода значения свойства в зависимости от типа свойства
function getFormatedValue(objValue) {
  const typeofObjValue = typeof objValue;
  if (typeofObjValue === 'object' && objValue !== null) return '[complex value]';
  if (typeofObjValue === 'boolean' || objValue === null || typeofObjValue === 'number') return `${objValue}`;
  return `'${objValue}'`;
}
// Форматер 'plain
export default function plain(data) {
  const path = [];
  function cb(acc, obj) {
    if (obj.status === 'added') {
      const formatedValue2 = getFormatedValue(obj.value2);
      return [...acc, `Property '${`${path.join('')}${obj.key}`}' was added with value: ${formatedValue2}`];
    }
    if (obj.status === 'deleted') {
      return [...acc, `Property '${`${path.join('')}${obj.key}`}' was removed`];
    }
    if (obj.status === 'changed') {
      const formatedValue1 = getFormatedValue(obj.value1);
      const formatedValue2 = getFormatedValue(obj.value2);
      return [...acc, `Property '${`${path.join('')}${obj.key}`}' was updated. From ${formatedValue1} to ${formatedValue2}`];
    }
    if (Object.hasOwn(obj, 'childObjects')) {
      path.push(`${obj.key}.`);
      const childAcc = obj.childObjects.reduce(cb, acc);
      path.pop();
      return childAcc;
    }
    return acc;
  }
  return `${data.reduce(cb, '').join('\n').replace(/\n$/m, '')}`;
}
