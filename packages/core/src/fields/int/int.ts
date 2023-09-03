import { FieldDefinition, FieldType } from '../../types';

export function int(): FieldDefinition {
  return {
    isForeignKey: false,
    isPrimaryKey: false,
    nullable: false,
    type: FieldType.Int,
  };
}
