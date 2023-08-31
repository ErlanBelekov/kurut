import { describe, test, expect } from 'vitest';
import { getClient } from './getClient';

describe('getClient', () => {
  test('throws an error if no connectionString is passed', async () => {
    await expect(() => getClient('')).rejects.toThrowError(
      'Provide a connection string'
    );
  });
});
