import { text, serial, pgTable } from 'drizzle-orm/pg-core';

const test = pgTable('test', {
  id: serial('id'),
  text: text('text'),
});

test.id;

function testGeneric<T extends string>(foo: T) {
  return foo;
}

testGeneric(test.text);
