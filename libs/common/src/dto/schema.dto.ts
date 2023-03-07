import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SCHEMA_TYPES, SCHEMA_SUB_TYPES } from '@lib/database/constants/schema';

/**
 * Data Transfer object used to request schema details
 */
export class SchemaRequestDTO {
  @IsOptional()
  @IsString()
  table_name?: string;

  @IsOptional()
  @IsEnum(SCHEMA_TYPES)
  type?: SCHEMA_TYPES;

  @IsOptional()
  @IsEnum(SCHEMA_SUB_TYPES)
  sub_type?: SCHEMA_SUB_TYPES;
}
