import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * A Custom Exception class to handle errors
 * - When a database table requested - does not exist
 */
export class RepositoryTableDoesNotExist extends HttpException {
  constructor(tableName: string) {
    super(
      'Cannot execute query at this here time!',
      HttpStatus.INTERNAL_SERVER_ERROR,
      {
        cause: new Error(),
        description: tableName,
      },
    );
  }
}
