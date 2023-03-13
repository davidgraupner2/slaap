import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GenericResponseDTO } from '../dto';
import { RepositoryTableDoesNotExist } from './custom.exceptions';

/**
 * A Global HTTP Exceptions filter
 * - Will catch all HTTP Exceptions and perform additional processing before sending a standardised response
 * - More details on creating these exceptions can be found here: https://docs.nestjs.com/exception-filters
 */
@Catch(HttpException)
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // Get access to the request and response objects
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Create a generic response object
    const generic_response = new GenericResponseDTO();

    // Handle custom exceptions a little differently
    if (exception instanceof RepositoryTableDoesNotExist) {
      // This exception occurs if a table does not exist
      // - We don't want to give the user of the API the tablename (security risk) - so we push the tablename to the log
      // and respond with a more generic message
      generic_response.statusMessage =
        'Cannot execute query at this here time!';
      // cause = 'The required data repository does not exist';
      console.log('############# Table does not exist!!!!');

      // Get the table name
      const tableName = exception['options']['description'];
      TODO: 'Write the exception to the log, indicating the table name that does not exist';
    }

    // Populate the generic response object
    generic_response.statusCode = exception.getStatus();
    generic_response.statusMessage = exception.message;
    generic_response.timeStamp = new Date().toISOString();
    generic_response.path = request.url;
    generic_response.method = request.method;
    generic_response.data = [];
    // const status = exception.getStatus();
    // const message = exception.message;
    // const cause = exception['response']['error'];

    //TODO: 'Write the exception details to the log file';

    // Update the response to be returned
    response.status(generic_response.statusCode).json(generic_response);

    // response.status(generic_response.statusCode).json({
    //   statusCode: status,
    //   statusMessage: message,
    //   timeStamp: new Date().toISOString(),
    //   path: request.url,
    // });
  }
}
