import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SchemaService {
  constructor(
    // Import Microservice client to connect to the Microservices via NATS
    @Inject('MICRO_SERVICE_CLIENT')
    private readonly micro_svc_client: ClientProxy,
  ) {}

  async getTables() {
    return this.micro_svc_client.send({ cmd: 'schema' }, {});
  }
}
