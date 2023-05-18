import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController, ClientController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { ClientUser } from 'src/database/entities/clientUser.entity';
import { UserClientService } from 'src/user-client/user-client.service';
import { UserClientModule } from 'src/user-client/user-client.module';
import { Address } from 'src/database/entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ClientUser, Address]),
    UserClientModule,
  ],
  controllers: [UserController, ClientController],
  providers: [UserService, UserClientService],
  exports: [UserService],
})
export class UserModule {}
