import { defineModel } from './index';

// demonstrate usage
const testModel = defineModel('customers', {});

async function main() {
  await testModel.findFirst({});

  console.log('Hey');
}

main();
