import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfigModule } from '@lib/common/config';
import { CommonLoggingModule } from '@lib/common/logging';
import { MicroServiceClientModule } from './microserviceclient';
import { UserController } from './user/user.controller';

@Module({
  imports: [EnvConfigModule, CommonLoggingModule, MicroServiceClientModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
