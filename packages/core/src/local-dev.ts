import { kurut } from './index';

import { customers } from './schema';

const db = kurut({ schema: { customers } });

async function main() {
  console.log('DB: \n', db);

  const customer = await db.customers.throwableFindFirst({});

  console.log('customer: \n', customer);

  console.log('Hey');
}

main();
