import { Module } from '@nestjs/common';
import { UserClientService } from './user-client.service';
import { UserClientController } from './user-client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientUser } from 'src/database/entities/clientUser.entity';
import { Address } from 'src/database/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientUser, Address])],
  controllers: [UserClientController],
  providers: [UserClientService],
  exports: [UserClientService],
})
export class UserClientModule {}
