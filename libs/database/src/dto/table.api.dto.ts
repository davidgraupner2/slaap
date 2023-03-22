import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsIn,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
  Validate,
  ValidateNested,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidateSortOrderField, ValidateTableName } from './validators';

export class TableAPIQueryDTO {
  @IsString()
  table_name: string;

  // @IsArray()
  @IsOptional()
  @Transform(({ value }) => String(value).split(','))
  columns = ['*'];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  results_per_page = 20;

  @IsArray()
  @IsOptional()
  @Transform(({ value }) => String(value).split(','))
  // @Validate(ValidateSortOrderField, [':ASC', ':DESC'])
  sort_columns = [];
}
