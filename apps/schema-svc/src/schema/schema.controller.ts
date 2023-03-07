import { Controller } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('schema')
export class SchemaController {
  constructor(private readonly schemaService: SchemaService) {}

  @MessagePattern({ cmd: 'schema' })
  getTables() {
    return this.schemaService.getSchema();
  }
}
