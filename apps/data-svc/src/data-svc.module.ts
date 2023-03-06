import { Module } from '@nestjs/common';
import { DataSvcController } from './data-svc.controller';
import { DataSvcService } from './data-svc.service';
import { EnvConfigModule } from '@lib/common/config';
import { CommonLoggingModule } from '@lib/common/logging';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [EnvConfigModule, CommonLoggingModule, UserModule],
  controllers: [DataSvcController, UserController],
  providers: [DataSvcService, UserService],
})
export class DataSvcModule {}
