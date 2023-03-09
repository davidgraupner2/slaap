import { Controller, ExceptionFilter, UseFilters } from '@nestjs/common';
import { SchemaService } from './schema.service';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { SchemaTableRequest } from '@lib/common/dto';
import { GlobalRPCExceptionFilter } from '@lib/common/error-handling';

/**
 * Register the RPFException Filter on all controller methods
 */
@UseFilters(new GlobalRPCExceptionFilter())
@Controller('schema')
export class SchemaController {
  constructor(private readonly schemaService: SchemaService) {}

  ////////////////////////////////////////
  // Section: Operations on single tables
  ////////////////////////////////////////
  @MessagePattern({ cmd: 'schema/table' })
  getTableSchema(
    @Payload() payload: SchemaTableRequest,
    @Ctx() context: NatsContext,
  ) {
    return this.schemaService.getTableSchema(payload.table_name);
  }

  ////////////////////////////////////
  // Section: Operations on all tables
  ////////////////////////////////////
  @MessagePattern({ cmd: 'schema/tables' })
  getTableSchemas(@Ctx() context: NatsContext) {
    return this.schemaService.getTablesSchema();
  }
}
