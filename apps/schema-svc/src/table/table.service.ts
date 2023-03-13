import { Injectable, Scope, Logger } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import schemaInspector from 'knex-schema-inspector';
import { Knex } from 'knex';
import { ConfigService } from '@nestjs/config';
import { RepositoryTableDoesNotExist } from '@lib/common/error-handling';
import { RpcException } from '@nestjs/microservices';

@Injectable({ scope: Scope.REQUEST })
export class TableService {
  constructor(
    @InjectModel() public readonly knex: Knex,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  private async tableExists(tableName: string) {
    /**
     * Check whether the table requested actually exists
     */
    const tableExists = await this.knex.schema.hasTable(tableName);

    // If it does not exist - throw an exception - nothing more we can do
    if (!tableExists) {
      throw new RpcException(new RepositoryTableDoesNotExist(tableName));
    }
  }

  /**
   * Sets the schemapath to include the one requested as well as public for global tables
   * @param schemaName The DB schemaName to add to the search path
   */
  private async setSchemaPath(schemaName) {
    let schemaSearchPath = '';

    if (schemaName === 'public') {
      schemaSearchPath = `SET search_path TO public`;
    } else {
      schemaSearchPath = `SET search_path TO ${schemaName}, public`;
    }

    this.logger.log(
      `Executing raw SQL Command to set schema search path: "${schemaSearchPath}"`,
      TableService.name,
    );

    await this.knex.raw(schemaSearchPath);
  }

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
    console.log('Started!!!');

    /**
     * First things first - set the schema search path
     */
    this.setSchemaPath(schemaName);

    // Now check the table exists
    await this.tableExists(tableName);

    const qb = this.queryBuilder(schemaName, tableName);

    return qb.select();
  }
}
