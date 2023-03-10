import { GenericResponseDTO } from '@lib/common/dto';
import { Injectable, Inject, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, of } from 'rxjs';

@Injectable()
export class SchemaService {
  constructor(
    // Import Microservice client to connect to the Microservices via NATS
    @Inject('MICRO_SERVICE_CLIENT')
    private readonly micro_svc_client: ClientProxy,
  ) {}

  async getSchema(tableName?: string, type?: string, subType?: string) {
    return this.micro_svc_client.send(
      { cmd: 'schema' },
      { table_name: tableName, type: type, sub_type: subType },
    );
  }

  ////////////////////////////////////////
  // Section: Operations on single tables
  ////////////////////////////////////////

  /**
   * Attempts to get the details for a specific tablle from the schema
   * @param tableName
   * @returns The table schema details or an error
   */
  async getTableSchema(tableName: string) {
    return await firstValueFrom(
      this.micro_svc_client
        .send({ cmd: 'schema/table' }, { table_name: tableName })
        .pipe(
          catchError((error) => {
            throw new HttpException(error.message, error.status);
          }),
        ),
      { defaultValue: [] },
    );
  }

  ////////////////////////////////////
  // Section: Operations on all tables
  ////////////////////////////////////
  async getTablesSchema() {
    return this.micro_svc_client.send({ cmd: 'schema/tables' }, {});
  }
}
