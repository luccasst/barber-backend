import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/database/entities/user.entity';
import { use } from 'passport';
import { UserRole } from 'src/enum/role.enum';
import { AuthRequest } from 'src/auth/models/authRequest';

@Controller('usuario-comum')
export class UserMethodsController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/filter')
  filterAll(@Query('search') search: string) {
    return this.userService.filterAll(search);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: User,
  ) {
    const userRole: UserRole = user.role as UserRole;
    return this.userService.update(id, updateUserDto, userRole);
  }

  @Patch()
  update(
    @Req() req: AuthRequest,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: User,
  ) {
    const userRole: UserRole = user.role as UserRole;
    return this.userService.update(req.user.id, updateUserDto, userRole);
  }

  @IsPublic()
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.remove(id);
  }
}
