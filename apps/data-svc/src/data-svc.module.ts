import { Module } from '@nestjs/common';
import { DataSvcController } from './data-svc.controller';
import { DataSvcService } from './data-svc.service';
import { EnvConfigModule } from '@lib/common/config';
import { CommonLoggingModule } from '@lib/common/logging';

@Module({
  imports: [EnvConfigModule, CommonLoggingModule],
  controllers: [DataSvcController],
  providers: [DataSvcService],
})
export class DataSvcModule {}
