// Функция получает на вход объект и выводит строку, соответствующую формута
// JSON для рассматриваеомго объекта
function stringify(data, symb = ' ', spacer = 1) {
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
  let level = 1;
  function hiddenfunc(object) {
    function cb(acc, obj) {
      let newAcc = acc;
      if (obj.status === 'added') newAcc += `${spacer.repeat(level - 1)}  + ${obj.key}: ${stringify(obj.value2, spacer, level + 1)}\n`;
      if (obj.status === 'deleted') newAcc += `${spacer.repeat(level - 1)}  - ${obj.key}: ${stringify(obj.value1, spacer, level + 1)}\n`;
      if (obj.status === 'changed') newAcc += `${spacer.repeat(level - 1)}  - ${obj.key}: ${stringify(obj.value1, spacer, level + 1)}\n`;
      if (obj.status === 'changed') newAcc += `${spacer.repeat(level - 1)}  + ${obj.key}: ${stringify(obj.value2, spacer, level + 1)}\n`;
      if (obj.status === 'unchanged') newAcc += `${spacer.repeat(level - 1)}    ${obj.key}: ${stringify(obj.value1, spacer, level + 1)}\n`;
      if (Object.hasOwn(obj, 'childObjects')) {
        level += 1;
        newAcc += `${spacer.repeat(level - 1)}${obj.key}: ${stringify(hiddenfunc(obj.childObjects), spacer, level)}\n`;
        level -= 1;
      }
      return newAcc;
    }
    return `{\n${object.reduce(cb, '')}${spacer.repeat(level - 1)}}`;
  }
  return hiddenfunc(data);
}
