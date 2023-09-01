import { KurutModel } from './types';

const dotenv = require('dotenv');
dotenv.config();

export * from './defineModel';

type KurutInitParams<T> = {
  schema: T;
  poolSize?: number;
};

type KurutClient<T> = T;

/**
 * kurut will return the KurutClient, which returns every schema model and exposes its CRUD methods
 */
export function kurut<T extends Record<string, KurutModel<Y>>, Y>(
  params: KurutInitParams<T>
): KurutClient<T> {
  // construct a type-safe object
  let client: KurutClient<T> = params.schema;

  for (const modelName in params.schema) {
    client[modelName] = params.schema[modelName];
  }

  return client;
}
