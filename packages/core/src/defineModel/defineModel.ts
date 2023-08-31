import { FieldDefinition, KurutModel } from 'types';
import { getClient } from 'getClient/index';

// pass table definition to defineModel, and it will return a type-safe TS table definition
export function defineModel<TFields extends Record<string, FieldDefinition>>(
  tableName: string,
  fields: TFields
): KurutModel<TFields> {
  return {
    async throwableFindFirst() {
      const client = await getClient(process.env.DATABASE_URL ?? '');

      console.log('client: \n', client);

      const text = `SELECT * FROM ${tableName}`;

      const res = await client.query(text);

      console.log(res.rows[0]);

      return null;
    },
    async safeFindFirst() {
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
