import { kurut } from './index';

import { customers } from './schema';

const db = kurut({ schema: { customers } });

async function main() {
  console.log('DB: \n', db);

  try {
    const customer = await db.customers.throwableFindFirst({});

    console.log('customer: \n', customer);
  } catch (error) {
    console.error(error);
  }

  const safeFirstCustomer = await db.customers.safeFindFirst({});

  console.log(safeFirstCustomer);

  console.log('End of local-dev script');
}

main();
