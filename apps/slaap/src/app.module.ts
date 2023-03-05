import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfigModule } from '@lib/common/config';
import { CommonLoggingModule } from '@lib/common/logging';
import { MicroServiceClientModule } from './microserviceclient';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    EnvConfigModule,
    CommonLoggingModule,
    MicroServiceClientModule,
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
