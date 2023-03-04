import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { transports, format } from 'winston';
import { WinstonModule } from 'nest-winston';
import {
  LOGGING_DATE_FORMAT,
  LOGGING_FILE_NAME,
  LOGGING_FOLDER_NAME,
  LOGGING_LEVEL,
  LOGGING_MAX_FILES,
  LOGGING_ZIP_ARCHIVE,
} from '@lib/common/config';
import * as path from 'path';

// Make it easier to set the logging format for Winston below
const { combine, timestamp, prettyPrint, colorize, errors, json } = format;

@Module({
  imports: [
    //////////////////////////////////////
    // Configure system wide logging here
    //////////////////////////////////////
    //
    // Logging uses:
    // winston - https://github.com/winstonjs/  (Logging Provider)
    // nest-winston - https://www.npmjs.com/package/nest-winston (Integrates Winston into nestjs)
    //
    // Logging Levels: https://github.com/winstonjs/winston#logging-levels
    // Custom Transports: https://github.com/winstonjs/winston#adding-custom-transports

    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        exitOnError: false,
        format: combine(errors({ stack: true }), timestamp(), json()),
        transports: [
          // Errors will always log to the console
          new transports.Console({
            level: 'error',
          }),
          // We are using the daily file rotation transport
          // - See: https://www.npmjs.com/package/winston-daily-rotate-file
          new transports.DailyRotateFile({
            dirname: path.resolve(
              __dirname,
              configService.get(LOGGING_FOLDER_NAME),
            ),
            filename: configService.get(LOGGING_FILE_NAME),
            datePattern: configService.get(LOGGING_DATE_FORMAT),
            maxFiles: configService.get(LOGGING_MAX_FILES),
            level: configService.get(LOGGING_LEVEL) || 'error',
            zippedArchive:
              configService.get(LOGGING_ZIP_ARCHIVE) === 'true' || false,
          }),
        ],
      }),
      // Inject the ConfigService, so we can read the
      // required logging level from the config file
      inject: [ConfigService],
    }),
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class CommonLoggingModule {}
