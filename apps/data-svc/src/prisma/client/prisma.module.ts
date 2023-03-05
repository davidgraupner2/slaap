import { Module } from '@nestjs/common';
import { PrismaService } from '../client/prisma.service';

@Module({
  providers: [PrismaService],
})
export class PrismaModule {}
