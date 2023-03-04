import { NestFactory } from '@nestjs/core';
import { DataSvcModule } from './data-svc.module';
import { ConfigService } from '@nestjs/config';
import 'winston-daily-rotate-file';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(DataSvcModule);

  // Get access to the ConfigService - to read the necessary configuration from the env file
  const configService = app.get<ConfigService>(ConfigService);

  // Replace the default NestJS Logger with Winston
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.listen(3000);
}
bootstrap();
