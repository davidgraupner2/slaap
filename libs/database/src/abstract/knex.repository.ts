import { IGenericRepository } from './generic.repository';
import { Knex } from 'knex';
import { BadRequestException, NotAcceptableException } from '@nestjs/common';
import { RepositoryTableDoesNotExist } from '@lib/common/error-handling';

/**
 * The KnexRepository class is a generic repository class that provides a standard set of operations on a database table.
 * Leveraging this repository enforces standardisation and reduces the amount of code needed to database access
 *
 * @author David Graupner
 * @version 1.0
 * @since 2023-02-07
 *
 */
export abstract class KnexRepository<T> implements IGenericRepository<T> {
  private schemaTable: string;

  /**
   * The constructor is used to initiliase a new instance of the repository
   * @param knex The Knex instance passed in
   * @param tableName The database tablename, this repository will provide access to
   * @param schemaName The database schema where the tablename exists
   */
  constructor(
    public readonly knex: Knex,
    public readonly tableName: string,
    private readonly schemaName: string = 'public',
  ) {
    // Set the full schema and table name
    this.schemaTable = `"${this.schemaName}.${this.tableName}"`;
  }

  // Verify the table exists
  //

  /**
   * This method checks if the table requested actually exists
   *
   * @throws RepositoryTableDoesNotExist - A custom exception
   */
  private async tableExists() {
    // TODO - this will not work with Schema's - might need another plan
    const tableExists = await this.knex.schema.hasTable(this.tableName);

    if (!tableExists) {
      throw new RepositoryTableDoesNotExist(this.tableName);
    }
  }

  /**
   * This method provides access to an instance of the KnexJS Query Builder
   * @returns KnexJS Schema Builder
   */
  public get queryBuilder(): Knex.QueryBuilder {
    return this.knex.withSchema(this.schemaName).table(this.tableName);
  }

  /**
   * This method leverages the KnexJS Query builder to provide access to all table records
   * @returns All table records
   */
  async all() {
    // First check table exists - if it doesn't - exception will be thrown
    await this.tableExists();
    return this.queryBuilder.select(this.tableName);
  }

  /**
   * This method leverages the KnexJS Query builder and finds specific records in the table
   * @param item Table object with the attributes we will use for filtering the table data
   * @returns A filtered list of table records
   */
  async find(item: Partial<T>): Promise<T[]> {
    // First check table exists
    // - if it doesn't - exception will be thrown
    await this.tableExists();

    // Find the records requested
    return await this.queryBuilder.where(item).select();
  }

  /**
   * This method leverages the KnexJS Query Builder to find a specific record based on its ID (primary key)
   * @param id The ID value to search on
   * @returns The table record that matches the ID
   */
  async findOne(id: number): Promise<T> {
    // First check table exists - if it doesn't - exception will be thrown
    await this.tableExists();

    return typeof id === 'string'
      ? this.queryBuilder.where('id', id).first()
      : this.queryBuilder.where(id).first();
  }

  /**
   * This method leverages the KnexJS Query builder to insert a new record
   * @param item The populated table item with attributes we want to insert into the table
   * @returns The updated table record
   *
   * @throws NotAcceptableException if the record cannot be inserted
   */
  async create(item: Omit<T, 'id'>): Promise<T> {
    // First check table exists
    // - if it doesn't - exception will be thrown
    await this.tableExists();

    try {
      const [output] = await this.queryBuilder.insert<T>(item).returning('*');
      return output as Promise<T>;
    } catch (error) {
      throw new NotAcceptableException('Internal server error', {
        cause: new Error(),
        description: error,
      });
    }
  }

  /**
   * This method leverages the KnexJS Query builder to insert new records in bulk
   * @param items The populated table items array, with attributes we want to insert into the table
   * @returns The updated table records
   *
   * @throws NotAcceptableException if the records cannot be inserted
   */
  async createMany(items: T[]): Promise<T[]> {
    // First check table exists
    // - if it doesn't - exception will be thrown
    await this.tableExists();

    try {
      return this.queryBuilder.insert<T>(items) as Promise<T[]>;
    } catch (error) {
      throw new NotAcceptableException('Internal server error', {
        cause: new Error(),
        description: error,
      });
    }
  }

  /**
   * This method leverages the KnexJS Query builder to update an existing records
   * @param id The id of the table record to update
   * @param item The table object with attributes populated that need to be updated
   * @returns The updated table record
   *
   * @throws NotAcceptableException if the record cannot be updated
   */
  async update(id: number, item: Partial<T>): Promise<T> {
    // First check table exists
    // - if it doesn't - exception will be thrown
    await this.tableExists();

    try {
      await this.queryBuilder.where('id', id).update(item);
      return this.queryBuilder.where('id', id).first();
    } catch (error) {
      throw new NotAcceptableException('Internal server error', {
        cause: new Error(),
        description: error,
      });
    }
  }

  /**
   * This method leverages the KnexJS Query builder to delete an existing record
   * @param id The id of the table record to delete
   * @returns true if the record was deleted successfully
   */
  async delete(id: number): Promise<boolean> {
    // First check table exists - if it doesn't - exception will be thrown
    await this.tableExists();

    return this.queryBuilder.where('id', id).del();
  }

  // Checks whether an item already exists with the same ID

  /**
   * This method leverages the KnexJS Query builder to check if an existing record exists with the requested id
   * @param id The id of the table record to find
   * @returns True if the record exists, else false
   */
  async existById(id: number | Partial<T>): Promise<boolean> {
    // First check table exists - if it doesn't - exception will be thrown
    await this.tableExists();

    const query = this.queryBuilder.select<[{ count: number }]>(
      this.knex.raw('COUNT(*)::integer as count'),
    );

    if (typeof id !== 'string') {
      query.where(id);
    } else {
      query.where('id', id);
    }

    const exist = await query.first();

    return exist?.count !== 0;
  }

  /**
   * This method leverages the KnexJS Query builder to check if an existing record exists with the requested attributes
   * @param item The populated table record with attributes we want to use for searching the table
   * @returns True if the record exists, else false
   */
  async exist(item: Partial<T>): Promise<boolean> {
    // First check table exists - if it doesn't - exception will be thrown
    await this.tableExists();

    const query = this.queryBuilder.select<[{ count: number }]>(
      this.knex.raw('COUNT(*)::integer as count'),
    );

    query.where(item);

    const exist = await query.first();

    return exist?.count !== 0;
  }
}
