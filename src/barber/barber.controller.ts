import {
  Controller,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFile } from 'src/shared/helper';
import { BarberService } from './barber.service';

@Controller('barber')
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @Patch(':id/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './upload/avatar',
        filename: HelperFile.customFilename,
      }),
    }),
  )
  updateAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.barberService.updateAvatar(id, file.path);
  }
}
