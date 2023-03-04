import { Controller, Get } from '@nestjs/common';
import { DataSvcService } from './data-svc.service';

@Controller()
export class DataSvcController {
  constructor(private readonly dataSvcService: DataSvcService) {}

  @Get()
  getHello(): string {
    return this.dataSvcService.getHello();
  }
}
