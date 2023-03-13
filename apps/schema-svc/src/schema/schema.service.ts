import { KnexRepository } from '@lib/database/abstract/knex.repository';
import { InjectModel } from 'nest-knexjs';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSchema } from '@lib/common/entities';
import schemaInspector from 'knex-schema-inspector';
import { Knex } from 'knex';
import { RpcException } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { SYSTEM_SCHEMAS } from '@lib/common';

@Injectable()
export class SchemaService extends KnexRepository<DataSchema> {
  constructor(
    @InjectModel() public readonly knex: Knex,
    private readonly configService: ConfigService,
  ) {
    super(knex, 'data_schema');
  }

  // Create a new instance of the schema inspector
  inspector = schemaInspector(this.knex);

  ///////////////////////////////////////////////////////////
  // Start:
  //        - Set of methods concerned with current state
  ///////////////////////////////////////////////////////////

  /**
   * getCurrentSchemas
   * @returns List of schemas that exist in the database (Minus system schemas)
   */
  async getCurrentSchemas() {
    // For storing list of schemas
    // const current_schemas = [];

    // const sql = `SELECT schema_name FROM information_schema.schemata where schema_name not in (${this.configService.get(
    //   SYSTEM_SCHEMAS,
    // )})`;
    // console.error(sql);

    // Get the list of all schemas directly from the database
    const schemas = await this.knex.raw(
      `SELECT schema_name FROM information_schema.schemata where schema_name not in (${this.configService.get(
        SYSTEM_SCHEMAS,
      )})`,
    );
    // console.log(schemas);

    // // Read the list of system schemas from the config file
    // const system_schemas = String(this.configService.get(SYSTEM_SCHEMAS)).split(
    //   ',',
    // );

    // // Add the schema to the array to return
    // // - but first ensure only user schemas as added
    // if (schemas) {
    //   for (let index = schemas['rows'].length - 1; index >= 0; index--) {
    //     if (
    //       system_schemas.indexOf(schemas['rows'][index]['schema_name']) === -1
    //     ) {
    //       current_schemas.push(schemas['rows'][index]['schema_name']);
    //     }
    //   }

    //   return current_schemas;
    // }
    return schemas;
  }

  ////////////////////////////////////////
  // Section: Operations on single tables
  ////////////////////////////////////////
  async getTableSchema(tableName: string) {
    // Start the SQL Statement with the table name
    const schema = await this.queryBuilder.whereILike('name', tableName);

    // Filter the query by table name if provided
    // if (tableName !== undefined) {
    //   // Set the tablename to search on
    //   schemas = await this.queryBuilder.where({
    //     name: tableName,
    //   });
    // }

    // Filter the query by Schema type if provided
    // if (type !== undefined) {
    //   schemas = await this.queryBuilder.where({
    //     type: type,
    //   });
    // }

    // Filter the query by Schema sub_type if provided
    // if (subType !== undefined) {
    //   schemas = await this.queryBuilder.where({
    //     subType: subType,
    //   });
    // }

    // Loop though the schema's found and populate the relationships
    // schemas.forEach(async (schema, index, array) => {
    // Populate the owner
    // schema.owner = await this.getOneToOneRelationshipData(
    //   'public',
    //   'user',
    //   'id',
    //   schema['owner'],
    // );

    // schema = this.AddOneOnOneRelationships(
    //   schema,
    //   await this.getOneToOneRelationshipData(
    //     'public',
    //     'user',
    //     'id',
    //     schema['owner'],
    //   ),
    // );

    //   console.log(schema);
    // });

    // this.table[0] = this.AddOneOnOneRelationships(
    //   this.table[0],
    //   await this.getOneToOneRelationshipData('public', 'user', 'id', 1),
    // );

    // console.log(this.table);

    // table.owner = await this.getOneToOneRelationshipData(
    //   'public',
    //   'user',
    //   'id',
    //   1,
    // );
    // console.log(table['owner']);

    // return this.getOneToOneRelationshipData('public', 'user', 'id', 1);

    if (schema.length > 0) {
      return schema;
    } else {
      console.log('Hello');
      throw new RpcException(
        new NotFoundException(`Table '${tableName}' was not found!`),
      );
    }

    return schema;

    // return this.inspector.foreignKeys('data_schema');

    // return await db;
  }

  async getTableSchemaById(id: number) {
    // Start the SQL Statement with the table id
    const schema = await this.queryBuilder.where('id', id);

    if (schema.length > 0) {
      return schema;
    } else {
      console.log('Hello');
      throw new RpcException(
        new NotFoundException(`Table with '${id}' was not found`),
      );
    }

    return schema;
  }

  ////////////////////////////////////
  // Section: Operations on all tables
  ////////////////////////////////////
  async getTablesSchema() {
    // Start the SQL Statement with all the records
    const schemas = await this.queryBuilder.select();

    this.inspector.withSchema('public');
    // console.log(await this.inspector.tables());
    console.log(await this.getCurrentSchemas());
    // console.log(await this.inspector.tableInfo('data_schema'));
    // console.log(await this.inspector.hasTable('data_schema'));
    // console.log(await this.inspector.columns());
    // console.log(await this.inspector.columnInfo('data_schema_columns'));
    // console.log(await this.inspector.foreignKeys('data_schema_columns'));

    // Filter the query by table name if provided
    // if (tableName !== undefined) {
    //   // Set the tablename to search on
    //   schemas = await this.queryBuilder.where({
    //     name: tableName,
    //   });
    // }

    // Filter the query by Schema type if provided
    // if (type !== undefined) {
    //   schemas = await this.queryBuilder.where({
    //     type: type,
    //   });
    // }

    // Filter the query by Schema sub_type if provided
    // if (subType !== undefined) {
    //   schemas = await this.queryBuilder.where({
    //     subType: subType,
    //   });
    // }

    // Loop though the schema's found and populate the relationships
    // schemas.forEach(async (schema, index, array) => {
    // Populate the owner
    // schema.owner = await this.getOneToOneRelationshipData(
    //   'public',
    //   'user',
    //   'id',
    //   schema['owner'],
    // );

    // schema = this.AddOneOnOneRelationships(
    //   schema,
    //   await this.getOneToOneRelationshipData(
    //     'public',
    //     'user',
    //     'id',
    //     schema['owner'],
    //   ),
    // );

    //   console.log(schema);
    // });

    // this.table[0] = this.AddOneOnOneRelationships(
    //   this.table[0],
    //   await this.getOneToOneRelationshipData('public', 'user', 'id', 1),
    // );

    // console.log(this.table);

    // table.owner = await this.getOneToOneRelationshipData(
    //   'public',
    //   'user',
    //   'id',
    //   1,
    // );
    // console.log(table['owner']);

    // return this.getOneToOneRelationshipData('public', 'user', 'id', 1);

    return schemas;

    // return this.inspector.foreignKeys('data_schema');

    // return await db;
  }

  AddOneOnOneRelationships(tableObject, objectPropperty) {
    tableObject.owner = objectPropperty;
    return tableObject;
  }

  async getOneToOneRelationshipData(
    schemaName: string,
    tableName: string,
    foreignKeycolumn: string,
    foreignKeyValue: number,
  ) {
    console.log(
      schemaName,
      ' ',
      tableName,
      ' ',
      foreignKeycolumn,
      ' ',
      foreignKeyValue,
    );
    return this.knex
      .withSchema(schemaName)
      .table(tableName)
      .where(foreignKeycolumn, foreignKeyValue)
      .first();
  }
}
