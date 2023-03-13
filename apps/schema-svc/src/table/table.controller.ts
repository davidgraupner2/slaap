import { SchemaTableRequest } from '@lib/common/dto';
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { TableService } from './table.service';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @MessagePattern({ cmd: 'table/all' })
  async getAllTableData(
    @Payload() payload: SchemaTableRequest,
    @Ctx() context: NatsContext,
  ) {
    console.log(payload);
    return await this.tableService.all('public', payload.table_name);
  }
}
