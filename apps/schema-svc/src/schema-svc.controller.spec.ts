import { Test, TestingModule } from '@nestjs/testing';
import { SchemaSvcController } from './schema-svc.controller';
import { SchemaSvcService } from './schema-svc.service';

describe('SchemaSvcController', () => {
  let schemaSvcController: SchemaSvcController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SchemaSvcController],
      providers: [SchemaSvcService],
    }).compile();

    schemaSvcController = app.get<SchemaSvcController>(SchemaSvcController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(schemaSvcController.getHello()).toBe('Hello World!');
    });
  });
});
