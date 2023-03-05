import { Controller, Inject, Get, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AnyARecord } from 'dns';
import { firstValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(
    // Import Microservice client to connect to the Microservices via NATS
    @Inject('MICRO_SERVICE_CLIENT')
    private readonly micro_svc_client: ClientProxy,
  ) {}

  @Get(':id')
  public async getUserById(@Param('id') id: string): Promise<any> {
    console.log('Hello');
    return this.micro_svc_client.send({ cmd: 'getUserById' }, parseInt(id));
  }
}
