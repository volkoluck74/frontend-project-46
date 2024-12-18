import stylish from './stylish.js';
import plain from './plain.js';

export default function formatter(style = 'stylish') {
  switch (style) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    default:
      throw new Error('Unknown format');
  }
}
