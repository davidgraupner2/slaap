import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  RpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { Observable, throwError } from 'rxjs';

/**
 * A Global HTTP Exceptions filter
 * - Will catch all HTTP Exceptions and perform additional processing before sending a standardised response
 * - More details on creating these exceptions can be found here: https://docs.nestjs.com/exception-filters
 */
@Catch(HttpException)
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('HTTP Exception Occurred', exception);
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

/**
 * A Global RPC Exceptions filter
 * - Will catch all RPC Exceptions and perform additional processing before sending a standardised response
 * - More details on creating these exceptions can be found here: https://docs.nestjs.com/microservices/exception-filters
 */
@Catch(RpcException)
export class GlobalRPCExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    console.log('RPC Exception Happened: ', exception);
    return throwError(() => exception.getError());
  }
}
