import { Test, TestingModule } from '@nestjs/testing';
import { DataSvcController } from './data-svc.controller';
import { DataSvcService } from './data-svc.service';

describe('DataSvcController', () => {
  let dataSvcController: DataSvcController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DataSvcController],
      providers: [DataSvcService],
    }).compile();

    dataSvcController = app.get<DataSvcController>(DataSvcController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(dataSvcController.getHello()).toBe('Hello World!');
    });
  });
});
