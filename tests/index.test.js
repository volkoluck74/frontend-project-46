import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('json stylish test', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(readFile('stylish.txt'));
});
test('yaml stylish test', () => {
  expect(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(readFile('stylish.txt'));
});
test('json plain test', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(readFile('plain.txt'));
});
test('yaml plain test', () => {
  expect(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(readFile('plain.txt'));
});

test('json json test', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(readFile('json.txt'));
});
test('yaml json test', () => {
  expect(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toEqual(readFile('json.txt'));
});
