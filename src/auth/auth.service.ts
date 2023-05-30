import {
  BadRequestException,
  Body,
  ForbiddenException,
  Injectable,
  Req,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/database/entities/user.entity';
import { UserPayload } from './models/userPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/userToken';
import { UserClientService } from 'src/user-client/user-client.service';
import { ClientUser } from 'src/database/entities/clientUser.entity';
import { Barber } from 'src/database/entities/barber.entity';
import { BarberService } from 'src/barber/barber.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userClientService: UserClientService,
    private readonly barberService: BarberService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: any): UserToken {
    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | ClientUser | Barber> {
    const findUser = await this.userService.findOne(email);
    console.log(findUser);

    if (findUser) {
      const isPasswordValid = await bcrypt.compare(password, findUser.password);

      if (isPasswordValid) {
        return {
          ...findUser,
          password: undefined,
        };
      }
    }
    const findBarber = await this.barberService.findOne(email);
    if (findBarber) {
      const IsPasswordValid = await bcrypt.compare(
        password,
        findBarber.password,
      );
      if (IsPasswordValid) {
        return {
          ...findBarber,
          password: undefined,
        };
      }
    }

    const findClient = await this.userClientService.findOne(email);
    console.log(findClient);

    if (findClient) {
      const userPass = await bcrypt.compare(password, findClient.password);

      if (userPass) {
        return {
          ...findClient,
          password: undefined,
        };
      }
    }

    throw new BadRequestException(
      'Email address or password provided is incorrect.',
    );
  }
}
