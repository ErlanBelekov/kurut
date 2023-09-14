import { Text } from './column';
import { table } from './index';

const customers = table({
  name: 'customers',
  columns: {
    id: new Text({ name: 'id' }),
    name: new Text({ name: 'name' }),
  },
});

async function main() {
  try {
    const customer = await customers.throwableFindFirst({});

    console.log('customer: \n', customer);
  } catch (error) {
    console.error(error);
  }

  const safeFirstCustomer = await customers.safeFindFirst({});

  console.log(safeFirstCustomer);

  console.log('End of local-dev script');
}

main();
