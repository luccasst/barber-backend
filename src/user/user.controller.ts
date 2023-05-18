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
<<<<<<< HEAD
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
=======

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
>>>>>>> ef2e31a794f74d2aaf4b6e2da59b55a583b07c52
  }
}
