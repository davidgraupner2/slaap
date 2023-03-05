import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfigModule } from '@lib/common/config';
import { CommonLoggingModule } from '@lib/common/logging';
import { MicroServiceClientModule } from '../microserviceclient/micro.service.client';

@Module({
  imports: [EnvConfigModule, CommonLoggingModule, MicroServiceClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
