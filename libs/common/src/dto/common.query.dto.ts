import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import {
  toBoolean,
  toLowerCase,
  toNumber,
  trim,
  toDate,
} from '../helper/general.helpers';

export class SimpleQueryDto {
  @Transform(({ value }) => toNumber(value, { default: 0 }))
  @IsNumber()
  @IsOptional()
  public page = 1;

  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  @IsOptional()
  public showRelations = false;
}
