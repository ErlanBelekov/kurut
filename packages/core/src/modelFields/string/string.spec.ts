import { describe, expect, test } from 'vitest';
import { string } from './string';
import { FieldDefinition, FieldType } from '../../types';

describe('modelFieldTypes: string()', () => {
  test('returns a proper FieldDefinition', () => {
    const expected: FieldDefinition = {
      type: FieldType.String,
      isPrimaryKey: false,
      isForeignKey: false,
      nullable: false,
    };

    const actual = string();

    expect(actual).toEqual(expected);
    expect(actual.type).not.toBe(FieldType.Boolean);
  });
});
