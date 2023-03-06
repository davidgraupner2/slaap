import { computeFullName, excludeKeys } from '@lib/common/utils';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async findById(id: number) {
    /**
     * Gets the user(s) that match the query
     */
    const users = await this.repository.getUsers({
      where: {
        id: id,
      },
      include: { owned_tenants: true },
    });

    /**
     * Loop though users found and add any computed properties
     */
    for (let i = 0; i < users.length; i++) {
      users[i] = this.enrichAndRemove(users[i]);
    }

    return users;
  }

  /**
   * Adds computed properties to the passed in user object
   * @param user The initial user object
   * @returns  The updated user object
   */
  private enrichAndRemove(user) {
    /**
     * Adds computed properties
     */
    user = computeFullName(user);

    /**
     * Remove required keys from object
     */
    user = excludeKeys(user, ['password']);

    // return the updated user object
    return user;
  }

  // async user(
  //   userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  // ): Promise<User | null> {
  //   return this.prisma.findUnique({
  //     where: userWhereUniqueInput,
  //   });
  // }

  // async users(params: {
  //   skip?: number;
  //   take?: number;
  //   cursor?: Prisma.UserWhereUniqueInput;
  //   where?: Prisma.UserWhereInput;
  //   orderBy?: Prisma.UserOrderByWithRelationInput;
  // }): Promise<User[]> {
  //   const { skip, take, cursor, where, orderBy } = params;
  //   return this.prisma.user.findMany({
  //     skip,
  //     take,
  //     cursor,
  //     where,
  //     orderBy,
  //   });
  // }

  // async createUser(data: Prisma.UserCreateInput): Promise<User> {
  //   return this.prisma.user.create({
  //     data,
  //   });
  // }

  // async updateUser(params: {
  //   where: Prisma.UserWhereUniqueInput;
  //   data: Prisma.UserUpdateInput;
  // }): Promise<User> {
  //   const { where, data } = params;
  //   return this.prisma.user.update({
  //     data,
  //     where,
  //   });
  // }

  // async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
  //   return this.prisma.user.delete({
  //     where,
  //   });
  // }

  // xprisma = this.prisma
  //   .$extends({
  //     result: {
  //       user: {
  //         full_name: {
  //           // the dependencies
  //           needs: { first_name: true, last_name: true },
  //           compute(user) {
  //             // the computation logic
  //             return `${user.first_name} ${user.last_name}`;
  //           },
  //         },
  //       },
  //     },
  //   })
  //   .$extends({
  //     result: {
  //       user: {
  //         password: {
  //           needs: { password: true },
  //           compute(user) {
  //             return '***';
  //           },
  //         },
  //       },
  //     },
  //   });
}
