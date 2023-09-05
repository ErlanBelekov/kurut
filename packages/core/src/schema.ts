import { table } from './table';
import { string } from './fields';

export const customers = table('customers', {
  id: string(),
  name: string(),
});
