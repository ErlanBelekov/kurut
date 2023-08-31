import { Client } from 'pg';

const dotenv = require('dotenv');
dotenv.config();

let client: Client;

// returns node-postgres client on top of which queries are executed
async function getClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error('Provide connection string');
  }

  if (!client) {
    client = new Client(process.env.DATABASE_URL);
    await client.connect();
  }

  return client;
}

// FieldDefinition describes almost all info about the field
// how a field is typed, it's default value, indices, etc
type FieldDefinition = {};

type FindFirstParams = {};

/**
 * ThrowableQueryResult is a type alias for return type of "throwable" methods
 */
type ThrowableQueryResult<T> = T | null;

/**
 * SafeQueryResult is return type for "safe" methods which never throw
 */
type SafeQueryResult<T> = {
  success: boolean;
  data?: T;
  error?: Error;
};

/**
 * KurutModelMetadata stores metadata about the model, like its fields, internally used data, etc
 */
type KurutModelMetadata<TFields> = {
  fields: TFields;
};

/**
 * KurutModel describes shape of every model in Kurut ORM: public methods, properties, etc
 */
interface KurutModel<TData, TFields> {
  /**
   * throwableFindFirst either finds the record or throws an error
   * @param params
   * @returns
   */
  throwableFindFirst: (
    params: FindFirstParams
  ) => Promise<ThrowableQueryResult<TData>>;

  /**
   * safeFindFirst either finds the first matching record or returns null
   * @param params
   * @returns
   */
  safeFindFirst: (params: FindFirstParams) => Promise<SafeQueryResult<TData>>;

  meta: KurutModelMetadata<TFields>;
}

// pass table definition to defineModel, and it will return a type-safe TS table definition
export function defineModel<
  TData,
  TFields extends Record<string, FieldDefinition>
>(tableName: string, fields: TFields): KurutModel<TData, TFields> {
  return {
    async throwableFindFirst(params) {
      const currClient = await getClient();

      console.log('currClient: \n', currClient);

      console.log(tableName);

      const text = `SELECT * FROM ${tableName}`;

      const res = await client.query(text);

      console.log(res.rows[0]);

      return null;
    },
    async safeFindFirst(params) {
      return null;
    },
    meta: {
      fields,
    },
  };
}
