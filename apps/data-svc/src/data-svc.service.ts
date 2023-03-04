import { Injectable } from '@nestjs/common';

@Injectable()
export class DataSvcService {
  getHello(): string {
    return 'Hello World!';
  }
}
