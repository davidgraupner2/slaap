import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

//docs.nestjs.com/pipes

@Injectable()
export class FieldsValidationPipe implements PipeTransform {
  transform(
    value: { tableName: string; fields: string },
    metadata: ArgumentMetadata,
  ) {
    console.log(value, 'Value: ###');
    console.log(metadata, 'Meta: ###');
    return value;
  }
}
