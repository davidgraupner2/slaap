import { Controller, Get } from '@nestjs/common';
import { SchemaSvcService } from './schema-svc.service';

@Controller()
export class SchemaSvcController {
  constructor(private readonly schemaSvcService: SchemaSvcService) {}

  @Get()
  getHello(): string {
    return this.schemaSvcService.getHello();
  }
}
