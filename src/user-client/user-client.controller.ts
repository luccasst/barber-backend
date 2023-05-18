import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { UserClientService } from './user-client.service';
import { CreateUserClientDto } from './dto/create-user-client.dto';
import { UpdateClientUserDto } from './dto/update-user-client.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserRole } from 'src/enum/role.enum';
import { ClientUser } from 'src/database/entities/clientUser.entity';
import { AuthRequest } from 'src/auth/models/authRequest';
import { Request } from 'express';

@Controller('usuario-cliente')
export class UserClientController {
  constructor(private readonly userClientService: UserClientService) {}

  // @IsPublic()
  // @Post()
  // create(@Body() createUserClientDto: CreateUserClientDto) {
  //   return this.userClientService.create(createUserClientDto);
  // }

  @Get()
  findAll() {
    return this.userClientService.findAll();
  }

  @Get('/filter')
  filterAll(@Query('search') search: string) {
    return this.userClientService.filterAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userClientService.findOneById(id);
  }

  // @Get('/mee')
  // findOneMe(@Req() req: AuthRequest) {
  //   return this.userClientService.findOneById(req.user.id);
  // }

  @Patch(':id')
  updateById(
    @Param('id') id: string,
    @Body() updateUserClientDto: UpdateClientUserDto,
    @CurrentUser() user: ClientUser,
  ) {
    const userRole: UserRole = user.role as UserRole;
    return this.userClientService.update(id, updateUserClientDto, userRole);
  }

  @Patch()
  update(
    @Req() req: AuthRequest,
    @Body() updateUserClientDto: UpdateClientUserDto,
    @CurrentUser() user: ClientUser,
  ) {
    const userRole: UserRole = user.role as UserRole;
    return this.userClientService.update(
      req.user.id,
      updateUserClientDto,
      userRole,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userClientService.remove(id);
  }
}
