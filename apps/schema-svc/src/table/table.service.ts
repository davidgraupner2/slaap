import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import schemaInspector from 'knex-schema-inspector';
import { Knex } from 'knex';
import { ConfigService } from '@nestjs/config';
import { RepositoryTableDoesNotExist } from '@lib/common/error-handling';

@Injectable({ scope: Scope.REQUEST })
export class TableService {
  constructor(
    @InjectModel() public readonly knex: Knex,
    private readonly configService: ConfigService,
  ) {}

  //   /**
  //    * This method checks if the table requested actually exists
  //    *
  //    * @throws RepositoryTableDoesNotExist - A custom exception
  //    */
  //   private async tableExists() {
  //     // TODO - this will not work with Schema's - might need another plan
  //     const tableExists = await this.knex.schema.hasTable(this.tableName);

  //     if (!tableExists) {
  //       throw new RepositoryTableDoesNotExist(this.tableName);
  //     }
  //   }

  /**
   * This method provides access to an instance of the KnexJS Query Builder
   * @returns KnexJS Schema Builder
   */
  private queryBuilder(
    schemaName: string,
    tableName: string,
  ): Knex.QueryBuilder {
    return this.knex.withSchema(schemaName).table(tableName);
  }

  /**
   * This method leverages the KnexJS Query builder to provide access to all table records
   * @returns All table records
   */
  async all(schemaName: string, tableName: string) {
    // First check table exists - if it doesn't - exception will be thrown

    const qb = this.queryBuilder(schemaName, tableName);

    return qb.select();
  }
}
