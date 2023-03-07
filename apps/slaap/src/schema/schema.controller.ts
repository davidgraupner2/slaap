import { Controller, Post, Body } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { MessagePattern } from '@nestjs/microservices';
import { SchemaRequestDTO } from '@lib/common/dto';

@Controller('schema')
export class SchemaController {
  constructor(private readonly schemaService: SchemaService) {}

  @Post()
  getSchema(@Body() schemaRequest: SchemaRequestDTO) {
    console.log('ouch', typeof schemaRequest);
    return this.schemaService.getSchema(
      schemaRequest.table_name,
      schemaRequest.type,
      schemaRequest.sub_type,
    );
  }
}
