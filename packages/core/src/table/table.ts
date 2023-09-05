import { KurutModel, KurutModelFieldType } from '../types';
import { getClient } from '../getClient';
import { NoRowsError } from '../errors';

type CreateTableParams<T> = {
  name: string;
  /**
   * columns should have a type constraint on table<T>() already
   */
  columns: T;
};

// {
//   id: string | number | Date
// }
// { id: primaryKey().string() }
//

// pass table definition to table, and it will return a type-safe model with CRUD methods
export function table<TColumns extends Record<string, KurutModelFieldType>>(
  params: CreateTableParams<TColumns>
): KurutModel<TColumns> {
  return {
    async throwableFindFirst() {
      const client = await getClient(process.env.DATABASE_URL ?? '');

      const text = `SELECT * FROM test LIMIT 1`;

      let queryResult;

      try {
        queryResult = await client.query(text);
        console.log(queryResult);

        if (!queryResult.rowCount) {
          throw new NoRowsError();
        }

        // if the shape of data doesn't match the shape of current model, we should throw an error too

        return queryResult.rows[0];
      } catch (error) {
        // we want to map the errors thrown by node-postgres
        // so we need DatabaseDriverErrorAdapter, which can translate errors from driver to KurutError instances
        throw error;
      }
    },
    async safeFindFirst() {
      const client = await getClient(process.env.DATABASE_URL ?? '');

      const text = `SELECT * FROM ${tableName} LIMIT 1`;

      let queryResult;

      try {
        queryResult = await client.query(text);
        if (!queryResult.rowCount) {
          return {
            success: false,
            error: new NoRowsError(),
          };
        }

        return {
          success: true,
          data: queryResult.rows[0],
        };
      } catch (error) {
        let finalError: Error;

        if (error instanceof Error) {
          finalError = error;
        } else {
          finalError = new Error('Unknown error');
        }

        return {
          success: false,
          error: finalError,
        };
      }
    },
    async safeCreateOne() {
      // get client
      const client = await getClient(process.env.DATABASE_URL ?? '');

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
