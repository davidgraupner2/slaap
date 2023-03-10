import { SimpleQueryDto } from '@lib/common/dto/common.query.dto';
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query() query: SimpleQueryDto): SimpleQueryDto {
    console.log(query);
    return query;
  }
}
