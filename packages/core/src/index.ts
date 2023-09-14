const dotenv = require('dotenv');
dotenv.config();

export * from './table';
import * as k from './table';
export { k };

// type KurutInitParams<T> = {
//   schema: T;
//   poolSize?: number;
// };

// type KurutClient<T> = T;

/**
 * kurut will return the KurutClient, which returns every schema model and exposes its CRUD methods
 */
// TO-DO: implement later, if needed
// export function kurut<
//   T extends Record<string, KurutTable<Y, U>>,
//   Y extends KurutTableFields<U>,
//   U
// >(params: KurutInitParams<T>): KurutClient<T> {
//   // construct a type-safe object
//   let client: KurutClient<T> = params.schema;

//   for (const modelName in params.schema) {
//     client[modelName] = params.schema[modelName];
//   }

//   return client;
// }
