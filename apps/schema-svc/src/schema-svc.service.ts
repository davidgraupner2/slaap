import { Injectable } from '@nestjs/common';

@Injectable()
export class SchemaSvcService {
  getHello(): string {
    return 'Hello World!';
  }
}
