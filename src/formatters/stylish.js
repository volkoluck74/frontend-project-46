// Функция получает на вход объект и выводит строку, соответствующую формута
// JSON для рассматриваеомго объекта
function stringify(data, symb, spacer) {
  if (typeof data !== 'object') return data.toString();
  function hiddenfunc(obj, replacer, spaceCount) {
    function cb(acc, key, index, array) {
      const transfer = index !== array.length - 1 ? '\n' : '';
      if (obj[key] === null) {
        return [...acc, `${replacer.repeat(spaceCount)}${key}: null${transfer}`];
      }
      if (typeof obj[key] !== 'object') {
        return [...acc, `${replacer.repeat(spaceCount)}${key}: ${obj[key]}${transfer}`];
      }
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        return [...acc, `${replacer.repeat(spaceCount)}${key}: ${hiddenfunc(obj[key], replacer, spaceCount + 1)}\n${replacer.repeat(spaceCount)}}${transfer}`];
      }
      return acc;
    }
    if (typeof obj !== 'object') return obj.toString();
    if (typeof obj === 'object' && obj !== null) {
      return `{\n${Object.keys(obj).reduce(cb, '').join('')}`;
    }
    return 'null';
  }
  if (data === null) return `${hiddenfunc(data, symb, spacer)}`;
  return `${hiddenfunc(data, symb, spacer)}\n${symb.repeat(spacer - 1)}}`;
}

export default function stylish(data) {
  const spacer = '    ';
  const level = 1;
  function hiddenfunc(object, lvl) {
    function cb(acc, obj) {
      if (obj.status === 'added') {
        return [...acc, `${spacer.repeat(lvl - 1)}  + ${obj.key}: ${stringify(obj.value2, spacer, lvl + 1)}\n`];
      }
      if (obj.status === 'deleted') {
        return [...acc, `${spacer.repeat(lvl - 1)}  - ${obj.key}: ${stringify(obj.value1, spacer, lvl + 1)}\n`];
      }
      if (obj.status === 'changed') {
        return [...acc, `${spacer.repeat(lvl - 1)}  - ${obj.key}: ${stringify(obj.value1, spacer, lvl + 1)}\n${spacer.repeat(lvl - 1)}  + ${obj.key}: ${stringify(obj.value2, spacer, lvl + 1)}\n`];
      }
      if (obj.status === 'unchanged') {
        return [...acc, `${spacer.repeat(lvl - 1)}    ${obj.key}: ${stringify(obj.value1, spacer, lvl + 1)}\n`];
      }
      if (Object.hasOwn(obj, 'childObjects')) {
        return [...acc, `${spacer.repeat(lvl)}${obj.key}: ${hiddenfunc(obj.childObjects, lvl + 1)}`];
      }
      return acc;
    }
    return `{\n${object.reduce(cb, '').join('')}${spacer.repeat(lvl - 1)}}\n`;
  }
  return hiddenfunc(data, level).replace(/\n$/m, '');
}
