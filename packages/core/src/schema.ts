import { defineModel } from './defineModel';
import { string } from './fields';

export const customers = defineModel('customers', {
  id: string(),
  name: string(),
});
