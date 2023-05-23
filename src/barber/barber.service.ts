import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Barber } from 'src/database/entities/barber.entity';
import { Rating } from 'src/database/entities/rating.entity';
import { User } from 'src/database/entities/user.entity';
import { HelperFile } from 'src/shared/helper';
import { CreateBarberDto } from './dto/create.barber.dto';
import * as fs from 'fs';

@Injectable()
export class BarberService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Barber)
    private readonly barberRepository: Repository<Barber>,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}

  async createBarber(createBarberDto: CreateBarberDto) {
    const createdBarber = await this.barberRepository.create(createBarberDto);
    return this.barberRepository.save(createdBarber);
  }

  async finAll() {
    const barbers = this.barberRepository.find();
    return barbers;
  }

  async findById(id: string) {
    const barber = await this.barberRepository.findOne({ where: { id } });
    if (!barber) {
      throw new NotFoundException('Usuário não encontrado');
    } else {
      return barber;
    }
  }

  async rateBarber(
    userId: string,
    barberId: string,
    stars: number,
  ): Promise<Rating> {
    if (!userId) {
      throw new Error('Invalid userId');
    }

    if (!barberId) {
      throw new Error('Invalid barberId');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const barber = await this.barberRepository.findOne({
      where: { id: barberId },
    });
    if (!barber) {
      throw new Error('Barber not found');
    }

    const rating = new Rating();
    rating.user = user;
    rating.barber = barber;
    rating.stars = stars;

    try {
      await this.ratingRepository.manager.transaction(async (manager) => {
        await manager.save(rating);
      });
    } catch (error) {
      throw new Error('Failed to rate the barber');
    }

    return rating;
  }

  /*  async updateAvatar(id: string, file: string, fileName: string) {
    const barberAvatar = await this.barberRepository.findOne({ where: { id } });

    if (barberAvatar.avatar === null || barberAvatar.avatar === '') {
      await this.barberRepository.update(id, {
        avatar: file,
        avatar_url: process.env.HOST + '/users/profile-image/' + fileName,
      });
    } else {
      await HelperFile.removeFile(barberAvatar.avatar);

      await this.barberRepository.update(id, {
        avatar: file,
        avatar_url: process.env.HOST + '/users/profile-image/' + fileName,
      });
    }
    const barber = await this.barberRepository.findOne({ where: { id } });

    return barber;
  } */

  async updateAvatar(id: string, avatar_url: string) {
    const userExists = await this.barberRepository.findOne({
      where: { id },
    });
    if (!userExists) {
      fs.rmSync(`./upload/avatar${avatar_url}`, {
        maxRetries: 2,
        retryDelay: 100,
      });
      throw new NotFoundException('User not found');
    } else {
      const deleteOld = userExists.avatar_url;
      if (deleteOld) {
        fs.rmSync(`./upload/avatar/${avatar_url}`, {
          maxRetries: 2,
          retryDelay: 100,
        });
      }
    }
    // atualizar o usuario com o titulo dado à sua imagem salva
    this.barberRepository.update(id, { avatar_url });

    return await this.barberRepository.findOne({ where: { id } });
  }
}
