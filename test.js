'use strict';
Array.prototype.find = undefined;

import test from 'ava';
require('./find.js');

const animals = [
  { name: 'Eagle' },
  { name: 'Dog' },
  { name: 'Monkey' },
  { name: 'Snake' },
  { name: 'Horse' },
  { name: 'Donkey' },
];

function searchHorse(animal) {
  return animal && animal.name === 'Horse';
}

test('should find an element in an array', (t) => {
  t.deepEqual(animals.find(searchHorse), { name: 'Horse' });
});

function searchElephant(animal) {
  return animal && animal.name === 'Elephant';
}

test('should return undefined on not found', (t) => {
  t.deepEqual(animals.find(searchElephant), undefined);
});

test('should return undefined with different prototypes from Array', (t) => {
  t.deepEqual(animals.find.call(Number, searchElephant), undefined);
  t.deepEqual(animals.find.call(String, searchElephant), undefined);
  t.deepEqual(animals.find.call(Object, searchElephant), undefined);
  t.deepEqual(animals.find.call(Function, searchElephant), undefined);
});

test('should throws with null as Prototype', (t) => {
  const find = () =>  {
    [].find.call(null)
  };
  t.throws(find, TypeError );
});

test('should throws when the param is not a function', (t) => {
  const find = (param)  => {
    return () => {
      [].find(param);
    }
  };
  t.throws(find(1), TypeError);
  t.throws(find(''), TypeError);
  t.throws(find(), TypeError);
  t.throws(find(null), TypeError);
  t.throws(find({}), TypeError);
});
