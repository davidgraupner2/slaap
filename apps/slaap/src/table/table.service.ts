import { Injectable, Inject, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, of } from 'rxjs';

@Injectable()
export class TableService {
  constructor(
    // Import Microservice client to connect to the Microservices via NATS
    @Inject('MICRO_SERVICE_CLIENT')
    private readonly micro_svc_client: ClientProxy,
  ) {}

  // create(createTableDto: CreateTableDto) {
  //   return 'This action adds a new table';
  // }

  async findAll(tableName: string) {
    return await firstValueFrom(
      this.micro_svc_client
        .send({ cmd: 'table/all' }, { table_name: tableName })
        .pipe(
          catchError((error) => {
            throw new HttpException(error.message, error.status);
          }),
        ),
      { defaultValue: [] },
    );
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} table`;
  // }

  // update(id: number, updateTableDto: UpdateTableDto) {
  //   return `This action updates a #${id} table`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} table`;
  // }
}
