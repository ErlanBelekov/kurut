import { kurut } from './index';

import * as schema from './schema';

const db = kurut({ schema });

async function main() {
  console.log('DB: \n', db);

  console.log(db.customers);

  console.log('Hey');
}

main();
