import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfigModule } from '@lib/common/config';
import { CommonLoggingModule } from '@lib/common/logging';
import { MicroServiceClientModule } from './microserviceclient';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { SchemaModule } from './schema/schema.module';
import { TableModule } from './table/table.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from '@lib/database';

@Module({
  imports: [
    EnvConfigModule,
    CommonLoggingModule,
    MicroServiceClientModule,
    DatabaseModule,
    UserModule,
    SchemaModule,
    TableModule,
    AuthModule,
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService],
})
export class AppModule {}
