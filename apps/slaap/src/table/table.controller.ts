import { SelectQueryDTO } from '@lib/database/dto/tableSelectQueryDto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseArrayPipe,
  Query,
} from '@nestjs/common';
import { TableService } from './table.service';
import { FieldsValidationPipe } from './validation.pipes';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  // @Post()
  // create(@Body() createTableDto: CreateTableDto) {
  //   return this.tableService.create(createTableDto);
  // }

  @Get(':table_name')
  findAll(
    @Param('table_name') table_name: string,
    @Query('fields', new FieldsValidationPipe()) fields: string,
  ) {
    console.log(table_name, fields);

    // return this.tableService.findAll(params.table_name);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tableService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
  //   return this.tableService.update(+id, updateTableDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tableService.remove(+id);
  // }
}
