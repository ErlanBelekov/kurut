import { Column } from './column';

export enum SQLType {
  Text = 'Text',
  Int = 'Int',
  Float = 'Float',
  Boolean = 'Boolean',
  Unset = 'Unset',
}

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
  columns: TFields;
  // tableName is name of the table in SQL database
  tableName: string;
};

export type CreateOneParams<TFields> = {
  /**
   * data should infer the fields
   */
  data: TFields;
};

export type KurutTableFields<T extends any> = Record<string, Column<T>>;

/**
 * KurutModel describes shape of every model in Kurut ORM: public methods, properties, etc
 */
export interface KurutTable<TFields extends KurutTableFields<Y>, Y> {
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
