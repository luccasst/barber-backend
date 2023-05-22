import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Barber } from 'src/database/entities/barber';
import { HelperFile } from 'src/shared/helper';
import { Repository } from 'typeorm';

@Injectable()
export class BarberService {
  constructor(
    @InjectRepository(Barber)
    private readonly barberRepository: Repository<Barber>,
  ) {}

  async updateAvatar(id: string, file: string) {
    const barberAvatar = await this.barberRepository.findOne({ where: { id } });

    if (barberAvatar.avatar === null || barberAvatar.avatar === '') {
      await this.barberRepository.update(id, {
        avatar: file,
      });
    } else {
      await HelperFile.removeFile(barberAvatar.avatar);

      await this.barberRepository.update(id, {
        avatar: file,
      });
    }
    const barber = await this.barberRepository.findOne({ where: { id } });

    return barber;
  }
}
