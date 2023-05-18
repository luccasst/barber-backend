import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UserClientService } from 'src/user-client/user-client.service';
import { CreateUserClientDto } from 'src/user-client/dto/create-user-client.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('usuario-comum')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}

@Controller()
export class ClientController {
  constructor(private readonly userClientService: UserClientService) {}

  @IsPublic()
  @Post('usuario-cliente')
  async createClient(@Body() createUserClientDto: CreateUserClientDto) {
    return await this.userClientService.create(createUserClientDto);
  }
}
