import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserClientDto } from './dto/create-user-client.dto';
import { UpdateClientUserDto } from './dto/update-user-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientUser } from 'src/database/entities/clientUser.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from 'src/database/dto/create-address';
import { Address } from 'src/database/entities/address.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/enum/role.enum';

@Injectable()
export class UserClientService {
  constructor(
    @InjectRepository(ClientUser)
    private readonly clientUserRepository: Repository<ClientUser>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  async create(createUserClientDto: CreateUserClientDto) {
    const hashPassword = await bcrypt.hash(createUserClientDto.password, 10);
    const userEmail = await this.clientUserRepository.findOne({
      where: { email: createUserClientDto.email },
    });

    const userCpf = await this.clientUserRepository.findOne({
      where: { cpf: createUserClientDto.cpf },
    });

    if (userEmail && createUserClientDto.email === userEmail.email) {
      throw new BadRequestException('This Email is already registered!');
    }
    if (userCpf && createUserClientDto.cpf === userCpf.cpf) {
      throw new BadRequestException('This CPF is already registered!');
    }

    // const address: CreateAddressDto = createUserClientDto.address;

    const newUser = this.clientUserRepository.create({
      ...createUserClientDto,
      password: hashPassword,
      // address,
    });
    if (!newUser) {
      throw new Error('User not created');
    } else {
      const saveUser = await this.clientUserRepository.save(newUser);
      return saveUser;
    }
  }

  findAll() {
    return this.clientUserRepository.find();
  }

  filterAll(filter: string) {
    return this.clientUserRepository
      .createQueryBuilder('clientUser')
      .where(
        'clientUser.name = :filter OR clientUser.email = :filter OR clientUser.role = :filter',
        { filter },
      )
      .getMany();
  }

  async findOne(email: string) {
    return await this.clientUserRepository.findOne({ where: { email } });
  }

  findOneById(id: string) {
    const user = this.clientUserRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Client not found');
    }

    return user;
  }

  async update(
    id: string,
    updateClientUserDto: UpdateClientUserDto,
    userRole: UserRole,
  ) {
    const client = await this.clientUserRepository.findOne({ where: { id } });

    const {
      cellphoneNumber,
      cpf,
      email,
      name,
      password,
      role,
      phoneNumber,
      urlPhoto,
    } = updateClientUserDto;
    const { address: updatedAddress } = updateClientUserDto;

    const emailExists = await this.clientUserRepository.findOne({
      where: { email: updateClientUserDto.email },
    });
    const cpfExists = await this.clientUserRepository.findOne({
      where: { cpf: updateClientUserDto.cpf },
    });

    if (emailExists && updateClientUserDto.email === emailExists.email) {
      throw new BadRequestException('this Email is already registered');
    }

    if (cpfExists && updateClientUserDto.cpf === cpfExists.cpf) {
      throw new BadRequestException('this CPF is already registered');
    }

    if (!client) {
      throw new NotFoundException('user not found');
    }

    if (updatedAddress) {
      if (client.address) {
        const updated = await this.addressRepository.save({
          ...client.address,
          ...updatedAddress,
        });
        client.address = updated;
      } else {
        const newAddress = await this.addressRepository.create(updatedAddress);
        client.address = newAddress;
      }
      await this.clientUserRepository.save(client);
    }

    if (
      role &&
      userRole !== UserRole.SuperAdmin &&
      role &&
      userRole !== UserRole.GestSuperAdmin
    ) {
      throw new BadRequestException(
        'Você não tem permissão para atualizar a role de outro usuário.',
      );
    }

    await this.clientUserRepository.update(id, {
      cellphoneNumber: cellphoneNumber
        ? cellphoneNumber
        : client.cellphoneNumber,
      cpf: cpf ? cpf : client.cpf,
      email: email ? email : client.email,
      name: name ? name : client.name,
      password: password ? await bcrypt.hash(password, 10) : client.password,
      role: role ? role : client.role,
      phoneNumber: phoneNumber ? phoneNumber : client.phoneNumber,
      urlPhoto: urlPhoto ? urlPhoto : client.urlPhoto,
    });

    return await this.clientUserRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const removeClient = await this.clientUserRepository.findOne({
      where: { id },
    });
    if (!removeClient) {
      throw new NotFoundException('id notFound');
    } else {
      return this.clientUserRepository.remove(removeClient);
    }
  }
}
