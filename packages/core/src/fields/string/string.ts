import { FieldDefinition, FieldType } from '../../types';

export function string(): FieldDefinition {
  return {
    type: FieldType.String,
    isPrimaryKey: false,
    isForeignKey: false,
    nullable: false,
    tsType: '',
  };
}
