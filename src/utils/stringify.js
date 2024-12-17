// Функция получает на вход объект и выводит строку, соответствующую формута
// JSON для рассматриваеомго объекта
export default function stringify(data, symb = ' ', spacer = 1) {
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
