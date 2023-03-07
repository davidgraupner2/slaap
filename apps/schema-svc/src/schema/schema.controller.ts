import { Controller } from '@nestjs/common';
import { SchemaService } from './schema.service';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { SchemaRequestDTO } from '@lib/common/dto';

@Controller('schema')
export class SchemaController {
  constructor(private readonly schemaService: SchemaService) {}

  @MessagePattern({ cmd: 'schema' })
  getSchema(
    @Payload() schemaRequest: SchemaRequestDTO,
    @Ctx() context: NatsContext,
  ) {
    console.log(
      '2',
      schemaRequest.table_name,
      'type ',
      schemaRequest.type,
      'sub ',
      schemaRequest.sub_type,
    );
    return this.schemaService.getSchema(
      schemaRequest.table_name,
      schemaRequest.type,
      schemaRequest.sub_type,
    );
  }
}
