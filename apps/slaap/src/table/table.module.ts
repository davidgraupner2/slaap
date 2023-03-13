import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { MicroServiceClientModule } from '../microserviceclient';

@Module({
  imports: [MicroServiceClientModule],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
