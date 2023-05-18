import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/database/entities/user.entity';
import { ListUser } from './dto/user.list';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';
import { UserRole } from 'src/enum/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    const admins = this.userRepository.find();
    return plainToInstance(ListUser, admins);
  }

  filterAll(filter: string) {
    return this.userRepository
      .createQueryBuilder('candidate')
      .where(
        'candidate.name = :filter OR candidate.email = :filter OR candidate.role = :filter',
        { filter },
      )
      .getMany();
  }

  async findOne(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findById(id: string) {
    const admin = await this.userRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException('Usuário não encontrado');
    } else {
      return plainToInstance(ListUser, admin);
    }
  }

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new BadRequestException('Senha não confere');
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const admin = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (admin) {
      throw new BadRequestException('Usuário já existe!');
    }

    const newAdmin = this.userRepository.create({
      ...createUserDto,
      password: hashPassword,
    });
    if (!newAdmin) {
      throw new Error('Admin not created');
    } else {
      const saveUSer = await this.userRepository.save(newAdmin);
      return saveUSer;
    }
  }

  async update(id: string, updateDto: UpdateUserDto, userRole: UserRole) {
    const user = await this.userRepository.findOne({ where: { id } });
    const { name, email, password, role } = updateDto;
    const emailExist = await this.userRepository.findOne({
      where: { email: updateDto.email },
    });

    if (emailExist && updateDto.email === emailExist.email) {
      throw new BadRequestException('Email already registered');
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
    await this.userRepository.update(id, {
      name: name ? name : user.name,
      email: email ? email : user.email,
      password: password ? await bcrypt.hash(password, 10) : user.password,
      role: role ? role : user.role,
    });
    return await this.userRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const adminRemove = await this.userRepository.findOne({ where: { id } });
    if (!adminRemove) {
      throw new NotFoundException('id não encontrado');
    } else {
      await this.userRepository.remove(adminRemove);
      return { message: 'Usuário removido com sucesso', user: adminRemove };
    }
  }
}
