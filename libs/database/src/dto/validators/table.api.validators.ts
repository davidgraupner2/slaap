import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import schemaInspector from 'knex-schema-inspector';

@ValidatorConstraint({ name: 'ValidateSortOrderField', async: false })
export class ValidateTableName implements ValidatorConstraintInterface {
  constructor(@InjectModel() public readonly knex: Knex) {}
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    // Create a new instance of the schema inspector
    // const inspector = schemaInspector(this.knex);

    // console.log(await this.knex.withSchema('public').);

    console.log(value, 'Table Name');
    return true;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    throw new Error('Method not implemented.');
  }
}

@ValidatorConstraint({ name: 'ValidateSortOrderField', async: false })
export class ValidateSortOrderField implements ValidatorConstraintInterface {
  constructor(@InjectModel() public readonly knex: Knex) {}

  // Create an array to store the values that cannot validate correctly
  // We use this for display in the message later
  validationFailures: string[] = [];

  /**
   * Performs the validation on the sort fields passed in
   * @param value The values array that needs to be validations
   * @param validationArguments A validation object passed in
   * @returns True if all values validate correctly - else false
   */
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    // clear the array that tracks bad values
    this.validationFailures.length = 0;

    // Loop through each value passed in
    for (let index = 0; index < value.length; index++) {
      // Extract the proposed sort order from the end of the sort order field passed in
      const sort_order = String(value[index]).indexOf(':');

      if (sort_order == -1) {
        // There is no sort order proposed
        // - Add this sort field to the validation failures
        this.validationFailures.push(value[index]);
      } else {
        // There is sort order proposed
        // Compare this to the allowed sort order
        const isMatched = validationArguments.constraints.includes(
          String(value[index]).substring(sort_order),
        );

        if (!isMatched) {
          // Sort order is not matches to whats allowed
          // Add the sort field to the validation failures
          this.validationFailures.push(value[index]);
        }
      }
    }

    // If no validation failures - return true, else false
    return true ? this.validationFailures.length == 0 : false;
  }

  /**
   * Set message to be returned - if validation failed
   * @param validationArguments A validation object passed in
   * @returns The formatted message as a string
   */
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Provided sort field(s) ${this.validationFailures
      .toString()
      .replace(
        ',',
        ' and ',
      )} do not all end with ${validationArguments.constraints
      .toString()
      .replace(',', ' or ')}. All sort fields must have a defined sort order`;
  }
}
