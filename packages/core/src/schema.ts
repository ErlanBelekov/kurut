import { defineModel } from './defineModel';
import { string } from './modelFields';

export const customers = defineModel('customers', {
  id: string(),
  name: string(),
});
