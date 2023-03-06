import { Module } from '@nestjs/common';
import { SchemaSvcController } from './schema-svc.controller';
import { SchemaSvcService } from './schema-svc.service';
import { EnvConfigModule } from '@lib/common/config';
import { CommonLoggingModule } from '@lib/common/logging';
import { DatabaseModule } from '@lib/database';

@Module({
  imports: [EnvConfigModule, CommonLoggingModule, DatabaseModule],
  controllers: [SchemaSvcController],
  providers: [SchemaSvcService],
})
export class SchemaSvcModule {}
