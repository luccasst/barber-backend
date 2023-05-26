import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Barber } from 'src/database/entities/barber.entity';
import { Rating } from 'src/database/entities/rating.entity';
import { User } from 'src/database/entities/user.entity';
import { CreateBarberDto } from './dto/create.barber.dto';
import { Address } from 'src/database/entities/address.entity';
import { GeolocationService } from './geoLocation.service';
import { CreateAddressDto } from 'src/database/dto/create-address';
import * as fs from 'fs';
import { CreateServiceDto } from 'src/database/dto/create-services';

@Injectable()
export class BarberService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Barber)
    private readonly barberRepository: Repository<Barber>,
    private readonly geoLocationService: GeolocationService,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async createBarber(createBarberDto: CreateBarberDto): Promise<Barber> {
    const { address, services, ...otherData } = createBarberDto;
    const addressDto: CreateAddressDto = createBarberDto.address;
    const serviceDto: CreateServiceDto[] = createBarberDto.services;

    try {
      const coordinates =
        await this.geoLocationService.getCoordinatesFromAddress(
          `${addressDto.street}, ${addressDto.number}, ${addressDto.city}, ${addressDto.state}, ${addressDto.country}`,
        );
      console.log(coordinates);

      const newBarber = this.barberRepository.create({
        ...otherData,
        services: serviceDto,
        address: addressDto,
        latitude: coordinates.latitude.toString(),
        longitude: coordinates.longitude.toString(),
      });
      console.log(newBarber);

      const savedBarber = await this.barberRepository.save(newBarber);
      console.log(savedBarber);
      return savedBarber;
    } catch (error) {
      throw new Error('Erro ao obter as coordenadas geográficas do endereço.');
    }
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
