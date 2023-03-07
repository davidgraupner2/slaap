import { Module } from '@nestjs/common';
import { SchemaController } from './schema.controller';
import { SchemaService } from './schema.service';
import { MicroServiceClientModule } from '../microserviceclient';

@Module({
  imports: [MicroServiceClientModule],
  controllers: [SchemaController],
  providers: [SchemaService],
})
export class SchemaModule {}
