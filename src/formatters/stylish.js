// Функция получает на вход объект и выводит строку, соответствующую формута
// JSON для рассматриваеомго объекта
function stringify(data, symb = ' ', spacer = 1) {
  if (typeof data !== 'object') return data.toString();
  function hiddenfunc(obj, replacer, spaceCount) {
    function cb(acc, key, index, array) {
      let newAcc = acc;
      if (obj[key] === null) {
        newAcc += `${replacer.repeat(spaceCount)}${key}: null`;
        if (index !== array.length - 1) newAcc += '\n';
      }
      if (typeof obj[key] !== 'object') {
        newAcc += `${replacer.repeat(spaceCount)}${key}: ${obj[key]}`;
        if (index !== array.length - 1) newAcc += '\n';
      }
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        newAcc += `${replacer.repeat(spaceCount)}${key}: ${hiddenfunc(obj[key], replacer, spaceCount + 1)}`;
        if (spaceCount >= 1) newAcc += '\n';
        newAcc += `${replacer.repeat(spaceCount)}}`;
        if (index !== array.length - 1) newAcc += '\n';
      }
      return newAcc;
    }
    if (typeof obj !== 'object') return obj.toString();
    if (typeof obj === 'object' && obj !== null) {
      return `{\n${Object.keys(obj).reduce(cb, '')}`;
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
