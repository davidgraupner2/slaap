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

  @Get('table/:tableName')
  getTable(@Param() params) {
    try {
      return this.schemaService.getTableSchema(params.tableName);
    } catch (error) {
      console.log(error);
    }
  }

  ////////////////////////////////////
  // Section: Operations on all tables
  ////////////////////////////////////
  @Get('tables')
  getTables() {
    return this.schemaService.getTablesSchema();
  }
}
