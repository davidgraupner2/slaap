import {
  Global,
  INestApplication,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * Hook that runs when module is initialised
   * - Establishes the DB Connection - if we don't do it this way, Prisma connects lazily on the first call to the database.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   *
   * see: https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
   */
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
