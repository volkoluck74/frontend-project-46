import stringify from './stringify.js';

function stylish(data) {
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

export default function formater(style = 'stylish') {
  switch (style) {
    case 'stylish':
      return stylish;
    default:
      throw new Error('Unknown format');
  }
}
