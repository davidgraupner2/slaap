import { Inject, Module, Logger, Global } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { ConfigService } from '@nestjs/config';
import {
  DB_NAME,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from '@lib/common/config/constants';

@Global()
@Module({
  imports: [
    // Dynamically create the Database Provider we will be using
    // - Passing in the ConfigService so that we can read the config from the environment
    //
    // - We are using knexjs - https://knexjs.org/
    // - We are also leveraging nest-knexjs - https://github.com/Tony133/nestjs-knexjs
    // - Its provides good features such as migration and seeding but also dyanamic SQL Query building for multiple databases
    KnexModule.forRootAsync({
      useFactory: (configService: ConfigService, logger: Logger) => ({
        config: {
          client: configService.get('DB_CLIENT'),
          debug: configService.get('DB_DEBUG') === 'true',
          pool: {
            min: parseInt(configService.get('DB_POOL_MIN_CONNECTIONS')),
            max: parseInt(configService.get('DB_POOL_MAX_CONNECTIONS')),
          },
          connection: {
            database: configService.get(DB_NAME),
            user: configService.get(DB_USER),
            password: configService.get(DB_PASSWORD),
            host: configService.get(DB_HOST),
            port: configService.get(DB_PORT),
          },
          // searchPath: ['public'],
          // Redirect KnexJS Logs to our logger instance - rather than console
          // TODO: Sort out logging here
          // log: {
          //   warn(message) {
          //     logger.warn(message, 'KnexDbService');
          //   },
          //   error(message) {
          //     logger.error(message, 'KnexDbService');
          //   },
          //   deprecate(message) {
          //     logger.verbose(message, 'KnexDbService');
          //   },
          //   debug(message) {
          //     logger.debug(message, 'KnexDbService');
          //   },
          // },
        },
      }),
      // Inject the ConfigService, so we can read the
      // required DB Config
      inject: [ConfigService],
    }),
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class DatabaseModule {}
