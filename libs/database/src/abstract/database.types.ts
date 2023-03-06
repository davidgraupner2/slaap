export enum DataWhereClauseOperators {
  'equals' = '=',
  'less than' = '<',
}

export type DataWhereClause<T> = {
  name: string;
  value: T;
  operator: 'string';
};
