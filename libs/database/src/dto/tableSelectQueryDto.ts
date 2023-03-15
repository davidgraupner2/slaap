import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class SelectQueryDTO {
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  //   @MinLength(10, { each: true })
  fields?: string[];
}
