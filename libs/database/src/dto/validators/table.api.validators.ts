import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'ValidateSortOrderField', async: false })
export class ValidateSortOrderField implements ValidatorConstraintInterface {
  badValues: string[] = [];

  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    // Start out expecting the value will have no match
    let isMatched = false;

    // Loop through each constraint passed in and check the sortField ends with one of the constraints passed in
    validationArguments.constraints.forEach((constraint) => {
      if (String(value).endsWith(constraint)) {
        // We matched one of the endings
        isMatched = true;
      }
    });

    // If we get here - all fields ended with the correct constraints
    if (!isMatched) {
      this.badValues.push(value);
    }
    return isMatched;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    console.log(validationArguments);

    if (this.badValues.length == 1) {
      return `Provided sort_field '${
        this.badValues
      }' does not end with either ${validationArguments.constraints
        .toString()
        .replace(',', ' or ')} . Sort fields must have a defined sort order`;
    } else {
      return `Provided sort_fields '${
        this.badValues
      }' do not end with either ${validationArguments.constraints
        .toString()
        .replace(',', ' or ')} . Sort fields must have a defined sort order`;
    }
  }
}
