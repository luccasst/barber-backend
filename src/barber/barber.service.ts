import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { UpdateBarberDto } from './dto/update.barber.dto';
import * as bcrypt from 'bcrypt';
import { ServicesBarber } from 'src/database/entities/services.entity';
import { UpdateServiceDto } from 'src/database/dto/update-services';

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
    @InjectRepository(ServicesBarber)
    private readonly serviceRepository: Repository<ServicesBarber>,
  ) {}

  async createBarber(createBarberDto: CreateBarberDto): Promise<Barber> {
    const { address, ...otherData } = createBarberDto;
    const addressDto: CreateAddressDto = createBarberDto.address;
    if (createBarberDto.password !== createBarberDto.passwordConfirmation) {
      throw new BadRequestException('Senha não confere');
    }
    const hash = await bcrypt.hash(createBarberDto.password, 10);
    const userBarber = await this.barberRepository.findOne({
      where: { email: createBarberDto.email },
    });
    if (userBarber) {
      throw new BadRequestException('Usuário já existe!');
    }

    try {
      const coordinates =
        await this.geoLocationService.getCoordinatesFromAddress(
          `${addressDto.street}, ${addressDto.number}, ${addressDto.city}, ${addressDto.state}, ${addressDto.country}`,
        );
      console.log(coordinates);

      const newBarber = this.barberRepository.create({
        ...otherData,
        password: hash,
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

  async findOne(email: string) {
    const barber = await this.barberRepository.findOne({ where: { email } });
    return barber;
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

  async update(
    id: string,
    updateBarberDto: UpdateBarberDto,
    services: UpdateServiceDto[],
  ) {
    const barber = await this.barberRepository.findOne({ where: { id } });
    if (services) {
      // Atualize cada serviço individualmente
      await Promise.all(
        services.map(async (updateServiceDto: UpdateServiceDto) => {
          const service = await this.serviceRepository.findOne({
            where: { id: updateServiceDto.id },
          });
          if (service) {
            // Atualize os campos do serviço
            service.name = updateServiceDto.name;
            service.price = updateServiceDto.price;
            await this.serviceRepository.save(service);
          }
        }),
      );
    }
    const { name, email, password, avatar } = updateBarberDto;

    const { address: updateAddress, latitude, longitude } = updateBarberDto;
    if (updateAddress) {
      // Atualize o endereço existente com as novas informações
      await this.addressRepository.update(barber.address.id, updateAddress);
    }

    // Atualize os outros campos do barbeiro
    await this.barberRepository.update(id, {
      name: name ? name : barber.name,
      email: email ? email : barber.email,
      password: password ? password : barber.password,
      avatar: avatar ? avatar : barber.avatar,
      latitude: latitude ? latitude : barber.latitude,
      longitude: longitude ? longitude : barber.longitude,
    });

    // Recupere o objeto atualizado do barbeiro
    const updatedBarber = await this.barberRepository.findOne({
      where: { id },
    });

    return updatedBarber;
  }

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
