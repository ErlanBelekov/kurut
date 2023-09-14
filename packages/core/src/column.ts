import { SQLType } from './types';

type ColumnConstructorParams = {
  name: string;
  sqlType: SQLType;
};

export class Column<X> {
  name: string;
  protected sqlType: SQLType = SQLType.Unset;
  protected isPrimaryKey: boolean = false;
  protected isForeignKey: boolean = false;
  protected isNullable: boolean = true;

  constructor(params: ColumnConstructorParams) {
    this.name = params.name;
    this.sqlType = params.sqlType;
  }

  primaryKey() {
    this.isPrimaryKey = true;
    return this;
  }

  foreignKey() {
    this.isForeignKey = true;
    return this;
  }

  nullable() {
    this.isNullable = false;
    return this;
  }
}

type NormalColumnConstructorParams = Omit<ColumnConstructorParams, 'sqlType'>;

export class Text extends Column<string> {
  constructor(params: NormalColumnConstructorParams) {
    super({ ...params, sqlType: SQLType.Text });
  }
}

export class Int extends Column<number> {
  constructor(params: NormalColumnConstructorParams) {
    super({ ...params, sqlType: SQLType.Int });
  }
}
