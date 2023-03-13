import { Module } from '@nestjs/common';
import { SchemaSvcController } from './schema-svc.controller';
import { SchemaSvcService } from './schema-svc.service';
import { EnvConfigModule } from '@lib/common/config';
import { CommonLoggingModule } from '@lib/common/logging';
import { DatabaseModule } from '@lib/database';
import { SchemaModule } from './schema/schema.module';
import { SchemaController } from './schema/schema.controller';
import { SchemaService } from './schema/schema.service';
import { TableModule } from './table/table.module';

@Module({
  imports: [
    EnvConfigModule,
    CommonLoggingModule,
    DatabaseModule,
    SchemaModule,
    TableModule,
  ],
  controllers: [SchemaSvcController, SchemaController],
  providers: [SchemaSvcService, SchemaService],
})
export class SchemaSvcModule {}
