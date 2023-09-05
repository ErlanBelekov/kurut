export enum FieldType {
  String = 'String',
  Int = 'Int',
  Float = 'Float',
  Boolean = 'Boolean',
}

// FieldDefinition describes almost all info about the field
// how a field is typed, it's default value, indices, etc
export type FieldDefinition = {
  type: FieldType;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  nullable: boolean;
  tsType: KurutModelFieldType;
};

export type FindFirstParams = {};

/**
 * ThrowableQueryResult is a type alias for return type of "throwable" methods
 */
export type ThrowableQueryResult<T> = T | null;

/**
 * SafeQueryResult is return type for "safe" methods which never throw
 */
export type SafeQueryResult<T> = {
  success: boolean;
  data?: T;
  error?: Error;
};

/**
 * KurutModelMetadata stores metadata about the model, like its fields, internally used data, etc
 */
export type KurutModelMetadata<TFields> = {
  fields: TFields;
  // tableName is name of the table in SQL database
  tableName: string;
};

export type CreateOneParams<TFields> = {
  /**
   * data should infer the fields
   */
  data: TFields;
};

export type KurutModelFieldType = string | number | boolean | Date;

/**
 * KurutModel describes shape of every model in Kurut ORM: public methods, properties, etc
 */
export interface KurutModel<
  TFields extends Record<string, FieldDefinition['tsType']>
> {
  /**
   * throwableFindFirst either finds the record or throws an error
   * @param params
   * @returns
   */
  throwableFindFirst: (
    params?: FindFirstParams
  ) => Promise<ThrowableQueryResult<TFields>>;

  /**
   * safeFindFirst either finds the first matching record or returns null
   * @param params - Learn more at www.kurut-orm.com/docs
   * @returns
   */
  safeFindFirst: (
    params?: FindFirstParams
  ) => Promise<SafeQueryResult<TFields>>;

  safeCreateOne: (
    data?: CreateOneParams<TFields>
  ) => Promise<SafeQueryResult<TFields>>;

  getMetaData: () => KurutModelMetadata<TFields>;
}
