import { Module } from '@nestjs/common';
import { BarberService } from './barber.service';
import { BarberController } from './barber.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barber } from 'src/database/entities/barber.entity';
import { Rating } from 'src/database/entities/rating.entity';
import { User } from 'src/database/entities/user.entity';
import { GeolocationService } from './geoLocation.service';
import { Address } from 'src/database/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Barber, Rating, User, Address])],
  providers: [BarberService, GeolocationService],
  controllers: [BarberController],
  exports: [BarberService, GeolocationService],
})
export class BarberModule {}
