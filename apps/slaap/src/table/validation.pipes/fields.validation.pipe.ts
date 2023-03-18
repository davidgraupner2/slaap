import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import schemaInspector from 'knex-schema-inspector';

//docs.nestjs.com/pipes

@Injectable()
export class FieldsValidationPipe implements PipeTransform<any> {
  constructor(@InjectModel() public readonly knex: Knex) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    // Extract the MetaType fields into the metaType parameter
    // - This gives us the type of object we are trying to validate

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Transform the plain javaScript object into the required object type for validation
    const object = plainToInstance(metatype, value);

    console.log(object, typeof object);

    // Run the object against the validation defined against the DTO object
    const error = await validate(object);

    // If the are errors - throw an HTTP error and don't allow execution to continue
    if (error.length > 0) {
      throw new BadRequestException('Validation Failed');
    }

    //TODO: Set the schema search path here
    if (!(await this.knex.schema.hasTable(object.table_name))) {
      throw new BadRequestException(
        `Table '${object.table_name}' does not exist!`,
      );
    }

    const inspector = schemaInspector(this.knex);
    console.log(await this.knex.schema.hasTable(value));

    // No errors - validation succeeded
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
