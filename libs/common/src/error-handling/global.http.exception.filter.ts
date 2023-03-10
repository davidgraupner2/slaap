import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GenericResponseDTO } from '../dto';

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
