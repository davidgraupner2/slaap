import { HttpException, HttpStatus, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { UpdateUserDto } from './dto/update.user.dto';
import { userDTO } from './dto/dto.user';
import { LoginUserDto } from './dto';
import { ConfigService } from 'src/config/config.service';
import { v4 as uuidv4 } from 'uuid';

// interface User {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

@Injectable()
export class UsersService {
  constructor(@InjectModel() private readonly knex: Knex, private logger: Logger, private configService: ConfigService) {}

  /* 
  Find and return all users with no where clause
  */
  async findAll() {
    const users = await this.knex.table('user');
    return { users };
  }

  async create(createUserDto: userDTO) {
    try {
      const users = await this.knex.table('users').insert({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
      });

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneByUserName(userName: string) {
    // If the details provided are not sufficient, don't bother looking further
    if (!userName) {
      return undefined;
    }

    // check we have a user with the userName in the provided userName Field
    const user = await this.knex
      .withSchema(this.configService.get('public_schema_name'))
      .select(
        'user.id as id',
        'user.firstName as firstName',
        'user.lastName as lastName',
        'user.userName as username',
        'user.email as email',
        'user.password as password',
        'user.verified as verified',
        'is_msp as is_msp',
      )
      .from('user')
      .where('user.userName', userName)
      .where('is_active', true)
      .first();

    return user;

    // return await this.knex
    //   .withSchema(this.configService.get('public_schema_name'))
    //   .select(
    //     'user.id as id',
    //     'user.firstName as firstName',
    //     'user.lastName as lastName',
    //     'user.userName as username',
    //     'user.email as email',
    //     'user.password as password',
    //     'user.verified as verified',
    //     'is_msp as is_msp',
    //   )
    //   .from('user')
    //   .where('user.userName', userName)
    //   .first()
    //   .returning<userDTO>('*');
  }

  // async findOneByUserName(userName: string) {
  //   // If the details provided are not sufficient, don't bother looking further
  //   if (!userName) {
  //     return undefined;
  //   }

  //   // check we have a user with the userName in the provided userName Field

  //   return await this.knex
  //     .withSchema('public')
  //     .select(
  //       'user.id as id',
  //       'user.firstName as firstName',
  //       'user.lastName as lastName',
  //       'user.userName as username',
  //       'user.email as email',
  //       'user.password as password',
  //       'user.verified as verified',
  //       'tenant.id as tenant_id',
  //       'tenant.name as tenant_name',
  //       'tenant.schema_name as tenant_schema_name',
  //     )
  //     .from('user')
  //     .join('tenant_user', 'user.id', '=', 'tenant_user.user_id')
  //     .join('tenant', 'tenant.id', '=', 'tenant_user.tenant_id')
  //     .where('user.userName', userName)
  //     .first()
  //     .returning<userDTO>('*');
  // }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }

    // check we have a user with the userName in the provided userName Field
    const user = await this.knex
      .withSchema(this.configService.get('public_schema_name'))
      .select(
        'user.id as id',
        'user.firstName as firstName',
        'user.lastName as lastName',
        'user.userName as username',
        'user.email as email',
        'user.password as password',
        'user.verified as verified',
        'is_msp as is_msp',
      )
      .from('user')
      .where('user.id', id)
      .first();

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const users = await this.knex.table('users').where('id', id).update({
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
      });

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    const users = await this.knex.table('users').where('id', id).del();
    return { users };
  }

  async revokeTokens(id: number, revoke_reason: string) {
    /* 
    Revokes all current unrevoked tokens for a user id passed in
    - Used when generating new tokens OR logging out
    */
    await this.knex('token').where({ user_id: id, revoked: false }).update({
      revoked: true,
      revoked_at: new Date(),
      updated_at: new Date(),
      revoke_reason: revoke_reason,
      refresh_token: '',
    });
  }

  /*  
  Saves the current access token ID and hashed Refresh token against the user record
  */
  async saveRefreshTokens(id: number, access_tokenId: string, refresh_token_id: string, hashedRefreshToken: string) {
    /* First revoke all current tokens before adding the new ones
     - We don't want tokens lying around that can still be used by this user
     */
    await this.revokeTokens(id, 'Refresh - New Token Requested');

    // Now Save the new tokens against the user
    this.saveTokens(id, access_tokenId, refresh_token_id, hashedRefreshToken);
  }

  private async saveTokens(id: number, access_tokenId: string, refresh_token_id: string, hashedRefreshToken: string) {
    // Save the new token against the user record
    // - Store the regreh token s- we can use that to grant the user a new token if needed
    const tokens = await this.knex.table('token').insert({
      id: uuidv4(),
      user_id: id,
      access_token_id: access_tokenId,
      refresh_token_id: refresh_token_id,
      refresh_token: hashedRefreshToken,
    });
  }

  /*  
  Saves the current access token ID and hashed Refresh token against the user record
  */
  async saveLoginTokens(id: number, access_tokenId: string, refresh_token_id: string, hashedRefreshToken: string) {
    /* First revoke all current tokens before adding the new ones
     - We don't want tokens lying around that can still be used by this user
     */
    await this.revokeTokens(id, 'Login - New Token Requested');

    // Now Save the new tokens against the user
    this.saveTokens(id, access_tokenId, refresh_token_id, hashedRefreshToken);
  }

  async getRefreshToken(id: number, refresh_token_id: string) {
    /*
      Return the current refresh token that is allocated to the user record
      - by refresh token id
      */

    const token = await this.knex
      .withSchema(this.configService.get('public_schema_name'))
      .table('token')
      .where({
        user_id: id,
        refresh_token_id: refresh_token_id,
      })
      .first();

    return token;
  }

  async getAccessToken(id: number, access_token_id: string) {
    /*
      Return the current token that is allocated to the user record
      - by access token id
      */
    return await this.knex
      .table('token')
      .where({
        user_id: id,
        access_token_id: access_token_id,
      })
      .first();
  }
}
