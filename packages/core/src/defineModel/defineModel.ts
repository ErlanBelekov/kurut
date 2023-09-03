import { FieldDefinition, KurutModel } from '../types';
import { getClient } from '../getClient';
import { NoRowsError } from '../errors';

// pass table definition to defineModel, and it will return a type-safe TS table definition
export function defineModel<TFields extends Record<string, FieldDefinition>>(
  tableName: string,
  fields: TFields
): KurutModel<TFields> {
  return {
    async throwableFindFirst() {
      const client = await getClient(process.env.DATABASE_URL ?? '');

      const text = `SELECT * FROM ${tableName}`;

      const res = await client.query(text);
      if (!res.rows.length) {
        throw new NoRowsError();
      }

      return res.rows[0];
    },
    async safeFindFirst() {
      const client = await getClient(process.env.DATABASE_URL ?? '');

      const text = `SELECT * FROM ${tableName}`;

      const res = await client.query(text);
      if (!res.rows.length) {
        return {
          success: false,
          error: new NoRowsError(),
        };
      }

      return {
        success: true,
        data: res.rows[0],
      };
    },
    async safeCreateOne() {
      // get client

      // insert values(pg package handles sql injection automatically)

      // catch errors and return them

      // return inserted value
      return {
        success: false,
      };
    },
    getMetaData: () => ({
      fields,
      tableName,
    }),
  };
}
