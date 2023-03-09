import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  statusMessage: string;
  url: string;
  method: string;

  reqId: string;
  message: string;
  data: T;
}

@Injectable()
export class GenericResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        statusMessage: context.switchToHttp().getResponse().statusMessage,
        url: context.switchToHttp().getRequest().url,
        method: context.switchToHttp().getRequest().method,

        reqId: context.switchToHttp().getRequest().reqId,
        message: data.message,
        data,
      })),
    );
  }
}
