// Функция сравнивает два объекта и возвраащет массив объектов, со свойствами, соответствующими
// результатам сравнения
export default function diff(obj1, obj2) {
  const firstKeys = Object.keys(obj1);
  const secondKeys = Object.keys(obj2);
  const keys = firstKeys.concat(secondKeys);
  // Фильтруем уникальные значения объединенного массива и сортируем их
  const uniqueKeys = keys.reduce((acc, key) => {
    if (acc.includes(key)) return acc;
    return [...acc, key];
  }, []).sort();
  function cb(key) {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const hasObj1Key = Object.hasOwn(obj1, key);
    const hasObj2Key = Object.hasOwn(obj2, key);
    if (hasObj1Key && !hasObj2Key) return { key, value1, status: 'deleted' };
    if (!hasObj1Key && hasObj2Key) return { key, value2, status: 'added' };
    if (typeof value1 === 'object' && typeof value2 === 'object') return { key, childObjects: diff(value1, value2) };
    if (hasObj1Key && hasObj2Key && value1 === value2 && (typeof value1 !== 'object' || typeof value2 !== 'object')) {
      return {
        key, value1, value2, status: 'unchanged',
      };
    }
    return {
      key, value1, value2, status: 'changed',
    };
  }
  return uniqueKeys.map(cb);
}
