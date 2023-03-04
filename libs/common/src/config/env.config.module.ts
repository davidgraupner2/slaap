import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    /**
     * Initilises a ConfigService to read the necessary configuration parameters from a .env file
     * - The actual location of the .env file is determined by the 'NODE_ENV' environment variable (default=development)
     * - Changing this environment variable will change the location of the config file needed
     * - For more information about this module/service see: https://docs.nestjs.com/techniques/configuration#configuration
     */
    ConfigModule.forRoot({
      envFilePath: path.resolve(
        __dirname,
        './config/',
        `${process.env.NODE_ENV || 'development'}`,
        '.app.env',
      ),
      isGlobal: true,
    }),
  ],
})
export class EnvConfigModule {}
