import { Controller, Inject, Get, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  public async getUserById(@Param('id') id: string): Promise<any> {
    return this.userService.getUserById(parseInt(id));
  }
}
