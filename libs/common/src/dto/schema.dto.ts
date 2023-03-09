import { IsEnum, IsOptional, IsString, IS_STRING } from 'class-validator';
import { SCHEMA_TYPES, SCHEMA_SUB_TYPES } from '@lib/database/constants/schema';

/**
 * Data Transfer object used for multiple tables
 */
export class SchemaTableRequest {
  @IsString()
  table_name: string;
}

export class SchemaRequestDTO2 {
  @IsOptional()
  @IsString()
  table_name?: string = '*';

  @IsOptional()
  @IsEnum(SCHEMA_TYPES)
  type?: SCHEMA_TYPES;

  @IsOptional()
  @IsEnum(SCHEMA_SUB_TYPES)
  sub_type?: SCHEMA_SUB_TYPES;
}
