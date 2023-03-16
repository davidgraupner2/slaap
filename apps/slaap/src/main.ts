import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import 'winston-daily-rotate-file';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as path from 'path';
import fs = require('fs');
import { ConfigService } from '@nestjs/config';
import {
  API_GATEWAY_LISTENING_IP,
  API_GATEWAY_LISTENING_PORT,
} from '@lib/common/config/constants';
import { useContainer } from 'class-validator';
import { GlobalHttpExceptionFilter } from '@lib/common/error-handling';

async function bootstrap() {
  // Load the certificates files for enabling https
  const certFile = fs.readFileSync(
    path.resolve(
      __dirname,
      './config/',
      `${process.env.NODE_ENV || 'development'}`,
      'certs/cert.pem',
    ),
  );
  const keyFile = fs.readFileSync(
    path.resolve(
      __dirname,
      './config/',
      `${process.env.NODE_ENV || 'development'}`,
      'certs/key.pem',
    ),
  );

  // Create the nest application with the certificates and HTTPS Options
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
  });

  // Replace the default NestJS Logger with Winston
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  /* enable the api prefix for the api*/
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Enable API URI Versioning and set the default version
  // - for everything to version 1 unless otherwise specified
  // see: https://docs.nestjs.com/techniques/versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Enable dependency injection for the class validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Use a global exceptions filter
  // - All Exceptions will use this for formatting etc
  // app.useGlobalFilters(new GlobalHttpExceptionFilter());

  /* Add global pipe validation
  - Data Transfer Objects will be automatically validated by the system*/
  app.useGlobalPipes(
    new ValidationPipe({
      // Remove fields not required as part of the DTO
      whitelist: true,

      // Enable debug messages for now
      enableDebugMessages: true,

      // Set Tranformation true
      transform: true,
    }),
  );

  // Get access to the ConfigService - to read the necessary configuration from the env file
  const configService = app.get<ConfigService>(ConfigService);

  // Get the configuration for the API Gateway
  const port = configService.get(API_GATEWAY_LISTENING_PORT);
  const host = configService.get(API_GATEWAY_LISTENING_IP);

  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);

  // Start the API Gateway on the configured port - default to 3000 if not configured
  await app.listen(port || 3000);

  Logger.log(
    `🚀 Gateway Api is running on: https://${host}:${port}/${globalPrefix}`,
  );
}
bootstrap();
