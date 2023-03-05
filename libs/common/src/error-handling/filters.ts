import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * A Global HTTP Exceptions filter
 * - Will catch all HTTP Exceptions and perform additiona processing before sending a standardised response
 * - More details on creating these exceptions can be found here: https://docs.nestjs.com/exception-filters
 */
@Catch(HttpException)
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception['response']['message'];
    const cause = exception['response']['error'];

    TODO: 'Write the exception details to the log file';

    // Update the response to be returned
    response.status(status).json({
      statusCode: status,
      statusMessage: message,
      cause: cause,
      timeStamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
