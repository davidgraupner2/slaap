import { NestFactory } from '@nestjs/core';
import { DataSvcModule } from './data-svc.module';
import { ConfigService } from '@nestjs/config';
import 'winston-daily-rotate-file';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NATS_CONFIG_SERVERS } from '@lib/common/config/constants';

async function bootstrap() {
  const app = await NestFactory.create(DataSvcModule);

  // Get access to the ConfigService - to read the necessary configuration from the env file
  const configService = app.get<ConfigService>(ConfigService);

  // Replace the default NestJS Logger with Winston
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Connect up the Auth Microservice using configuration from the env file
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [configService.get(NATS_CONFIG_SERVERS)],
      authenticator: 
    },
  });

  // Start the Auth Microservice
  app.startAllMicroservices();
}
bootstrap();
