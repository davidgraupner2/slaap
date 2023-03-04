import { Module } from '@nestjs/common';
import { DataSvcController } from './data-svc.controller';
import { DataSvcService } from './data-svc.service';
import { EnvConfigModule } from '@lib/common/config';
import { CommonLoggingModule } from '@lib/common/logging';
import { PrismaClientModule } from './prisma-client/prisma-client.module';

@Module({
  imports: [EnvConfigModule, CommonLoggingModule, PrismaClientModule],
  controllers: [DataSvcController],
  providers: [DataSvcService],
})
export class DataSvcModule {}
