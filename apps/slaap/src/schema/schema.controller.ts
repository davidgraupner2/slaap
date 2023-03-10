import { SchemaTableByIdRequest } from '@lib/common/dto';
import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Param,
  Catch,
} from '@nestjs/common';
import { SchemaService } from './schema.service';

@Controller('schema')
export class SchemaController {
  constructor(private readonly schemaService: SchemaService) {}

  ////////////////////////////////////////
  // Section: Operations on single tables
  ////////////////////////////////////////

  @Get('tableByName/:tableName')
  getTable(@Param() params) {
    return this.schemaService.getTableSchema(params.tableName);
  }

  @Get('table/:id')
  getTableById(@Param('id') IdDTO: SchemaTableByIdRequest) {
    return this.schemaService.getTableSchemaById(IdDTO.id);
  }

  ////////////////////////////////////
  // Section: Operations on all tables
  ////////////////////////////////////
  @Get('tables')
  getTables() {
    return this.schemaService.getTablesSchema();
  }
}
