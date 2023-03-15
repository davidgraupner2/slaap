import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

//docs.nestjs.com/pipes

@Injectable()
export class FieldsValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    console.log(metadata);
    return value;
  }
}
