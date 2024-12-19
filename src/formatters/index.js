import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default function formatter(style = 'stylish') {
  switch (style) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      throw new Error('Unknown format');
  }
}
