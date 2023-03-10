import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

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
    // Throw the error so that its caught higher up or via the API Gateway
    return throwError(() => exception.getError());
  }
}
