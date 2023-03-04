import { Module } from '@nestjs/common';
import { DataSvcController } from './data-svc.controller';
import { DataSvcService } from './data-svc.service';
import { EnvConfigModule } from '@lib/common/config';
import { CommonLoggingModule } from '@lib/common/logging';
import { PrismaModule } from './prisma-client/prisma.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma-client/prisma.service';

@Module({
  imports: [EnvConfigModule, CommonLoggingModule, PrismaModule, UserModule],
  controllers: [DataSvcController, UserController],
  providers: [DataSvcService, UserService, PrismaService],
})
export class DataSvcModule {}
