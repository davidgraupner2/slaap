import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as userModel } from '@prisma/client';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'getUserById' })
  async getUserById(data: number): Promise<userModel> {
    return this.userService.findById(data);
  }

  // @Get(':email')
  // async getUserByEmail(@Param('email') email: string): Promise<userModel> {
  //   console.log('Hereemail');
  //   return this.userService.user({ email: String(email) });
  // }

  // @Post()
  // async signupUser(
  //   @Body()
  //   userData: {
  //     first_name: string;
  //     last_name: string;
  //     email: string;
  //     user_name?: string;
  //     password: string;
  //   },
  // ): Promise<userModel> {
  //   if (!userData.user_name) {
  //     userData.user_name = userData.email;
  //   }

  //   return this.userService.createUser(userData);
  // }

  // @Get('filtered-users/:searchString')
  // async getFilteredUsers(
  //   @Param('searchString') searchString: string,
  // ): Promise<userModel[]> {
  //   return this.userService.users({
  //     where: {
  //       OR: [
  //         {
  //           email: { contains: searchString },
  //         },
  //         {
  //           user_name: { contains: searchString },
  //         },
  //         {
  //           first_name: { contains: searchString },
  //         },
  //         {
  //           last_name: { contains: searchString },
  //         },
  //       ],
  //     },
  //   });
  // }

  // @Delete('id')
  // async deleteUserById(@Param('id') id: string): Promise<userModel> {
  //   return this.userService.deleteUser({ id: Number(id) });
  // }

  // @Delete('email')
  // async deleteUserByEmail(@Param('email') email: string): Promise<userModel> {
  //   return this.userService.deleteUser({ email: String(email) });
  // }
}
