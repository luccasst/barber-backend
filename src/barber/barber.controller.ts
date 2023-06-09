import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFile } from 'src/shared/helper';
import { BarberService } from './barber.service';
import { CreateBarberDto } from './dto/create.barber.dto';
import { Response } from 'express';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { barberMulterOptions } from './barberStorage.config';
import { UpdateBarberDto } from './dto/update.barber.dto';
import { UpdateServiceDto } from 'src/database/dto/update-services';

@Controller('barber')
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @IsPublic()
  @Post('cadastro')
  async create(@Body() createBarberDto: CreateBarberDto) {
    /*     console.log(createBarberDto);
     */
    return await this.barberService.createBarber(createBarberDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barberService.findById(id);
  }

  @Get()
  findAll() {
    return this.barberService.finAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() UpdateBarberDto: UpdateBarberDto,
    @Body('services') services: UpdateServiceDto[],
  ) {
    return this.barberService.update(id, UpdateBarberDto, services);
  }

  @Patch(':barberId/rate/:userId')
  async rateBarber(
    @Param('barberId') barberId: string,
    @Param('userId') userId: string,
    @Body('stars') stars: number,
  ) {
    const rating = await this.barberService.rateBarber(barberId, userId, stars);
    return rating;
  }

  @Patch(':id/avatar')
  @UseInterceptors(FileInterceptor('avatar', barberMulterOptions))
  async updateAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.barberService.updateAvatar(id, file.filename);
  }

  @Get('profile-image/:imagename')
  findProfileImage(
    @Param('imagename') imagename: string,
    @Res() res: Response,
  ) {
    return res.sendFile(imagename, {
      root: './upload/avatar',
    });
  }
}
