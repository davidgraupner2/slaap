/* 
Constants that help define the database schema
*/

export enum COLUMN_TYPES {
  increments = 'increments', // PostGres - bigserial (includes Primary Key) - large autoincrement integer - 	1 to 9223372036854775807
  integer = 'integer', // PostGres - Integer (4 bytes) -2147483648 to +2147483647
  bigInteger = 'bigInteger', // PostGres - Integer (8 bytes) -9223372036854775808 to +9223372036854775807
  smallInt = 'smallint', // PostGres - Integer (2 bytes) - -32768 to +32767
  string = 'string',
  text = 'text',
  float = 'float',
  money = 'money',
  boolean = 'boolean',
  date = 'date',
  datetime = 'datetime',
  time = 'time',
  timestamp = 'timestamp',
  binary = 'binary',
  enum = 'enum',
  json = 'json',
  jsonb = 'jsonb',
  uuid = 'uuid',
  geometry = 'geometry',
  geography = 'geometry',
  point = 'point',
  email = 'email',
  url = 'url',
  password = 'password',
}

export enum SCHEMA_TYPES {
  table = 'table',
  view = 'view',
}

export enum SCHEMA_SUB_TYPES {
  system_table = 'system-table',
  system_view = 'system-view',
  user_table = 'user-table',
  user_view = 'user-view',
}
