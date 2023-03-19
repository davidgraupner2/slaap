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
export class TableAPIQueryDTOValidationPipe implements PipeTransform<any> {
  // Some instance variables we need
  private column_errors = [];

  constructor(@InjectModel() public readonly knex: Knex) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    // Clear the errors - everytime we run the checks
    this.column_errors.length = 0;

    // Extract the MetaType fields into the metaType parameter
    // - This gives us the type of object we are trying to validate
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Transform the plain javaScript object we received into the required object type for validation
    const object = plainToInstance(metatype, value);

    console.log(object, typeof object);

    // Run the object against the initial validation defined against the DTO object
    // - If Validation fails here, an HTTP Error with the validtion errors will be provided
    await validate(object);

    // If there are errors - throw an HTTP error and don't allow execution to continue
    // if (error.length > 0) {
    //   throw new BadRequestException('Validation Failed');
    // }

    //TODO: Set the schema search path here
    // Check that the table requested actually does exist
    if (!(await this.knex.schema.hasTable(object.table_name))) {
      throw new BadRequestException(
        `Table '${object.table_name}' does not exist!`,
      );
    }

    // Check that the wildcard column and other columns have not been requested
    // - It doesn't make sense to request all columns returned and then define other columns as well
    if (object.columns.length > 1 && object.columns.includes('*')) {
      throw new BadRequestException(
        `Cannot request all columns '*' and then also request additional columns. Columns requested [${object.columns}]`,
      );
    }

    // Loop though the columns provided and check that they exist in the table requested
    // - Ignore '*' as that means all fields
    for (let index = 0; index < object.columns.length; index++) {
      if (object.columns[index] !== '*') {
        if (
          (await this.knex.schema.hasColumn(
            object.table_name,
            object.columns[index],
          )) === false
        ) {
          // Fields provided does not exist in the table
          this.column_errors.push(
            `Column '${object.columns[index]}' does not exist in table '${object.table_name}'`,
          );
        }
      }
    }

    // If we did get column errors, generate an exception
    if (this.column_errors.length > 0) {
      throw new BadRequestException(this.column_errors);
    }

    // Check sort orders are correctly requested
    // const sortOrderErrors = checkSortOrderApplied(
    //   ['ASC', 'DESC'],
    //   object.sort_order,
    // );
    // console.log(sortOrderErrors, 'errors');

    // if (sortOrderErrors.length > 0) {
    //   throw new BadRequestException(this.column_errors);
    // }

    console.log(this.column_errors);

    const inspector = schemaInspector(this.knex);

    // No errors - validation succeeded
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

function checkSortOrderApplied(
  SortOrderNeeded: string[],
  columnsToCheck: string[],
) {
  const sortOrderErrors = [];

  // Loop through each column passed in
  for (let index = 0; index < columnsToCheck.length; index++) {
    // Extract the proposed sort order from the end of the column passed in
    const sort_order = String(columnsToCheck[index]).indexOf(':');

    if (sort_order == -1) {
      // There is no sort order proposed
      // - Add this sort field to the validation failures
      sortOrderErrors.push(
        `${columnsToCheck[index]} has no sort order requested. Add '${SortOrderNeeded}' suffix`,
      );
    } else {
      // There is sort order proposed
      // Compare this to the allowed sort order
      const isMatched = SortOrderNeeded.includes(
        String(columnsToCheck[index]).substring(sort_order),
      );

      if (!isMatched) {
        // Sort order is not matches to whats allowed
        // Add the sort field to the validation failures
        sortOrderErrors.push(
          `${columnsToCheck[index]} has an  invalid sort order requested. Add '${SortOrderNeeded}' suffix`,
        );
      }
    }
  }

  // Return the resulting array of errors
  return sortOrderErrors;
}
