import { Root } from '../root';

import { SCHEMA_TYPES, COLUMN_TYPES } from '@lib/database/constants/schema';

export class DataSchema extends Root {
  id: number;
  name: string;
  description: string;
  type: SCHEMA_TYPES;
  owner: number;
  tenant: number;
  updateable: boolean;
  extendable: boolean;
}

export class DataSchemaColumn extends Root {
  id: number;
  name: string;
  description: string;
  mandatory: boolean;
  type: COLUMN_TYPES;
  defaultBoolean: boolean;
  defaultString: string;
  length: number;
  precision: number;
  scale: number;
  useTz: boolean;
  defaultToNow: boolean;
  prefix: string;
}

export class TenantSimple {
  id: number;
  name: string;
  defaultTenant: boolean;
}
