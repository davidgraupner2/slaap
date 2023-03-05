import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { NATS_CONFIG_SERVERS } from '@lib/common/config/constants';

/**
 * Shared Module creating and exporting a common Microservice Client
 * - This client can be used by any other modules
 */
@Module({
  imports: [
    /** Registers a MicroService client Proxy that connects to the NATS Application
     * - This client proxy will be used to send Request/Response methods and generate events
     * - Leveraging Nats as the transport layer
     * - See: https://nats.io/ (NATS)
     * - See: https://docs.nestjs.com/microservices/nats (NestJs - using NATS)
     */
    ClientsModule.registerAsync([
      {
        name: 'MICRO_SERVICE_CLIENT',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [configService.get(NATS_CONFIG_SERVERS)],
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class MicroServiceClientModule {}
