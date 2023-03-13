import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * A Custom Exception class to handle errors
 * - When a database table requested - does not exist
 */
export class RepositoryTableDoesNotExist extends HttpException {
  constructor(tableName: string) {
    super(
      'Table not found - Cannot execute query at this time!',
      HttpStatus.NOT_FOUND,
      {
        cause: new Error(),
        description: tableName,
      },
    );
  }
}
