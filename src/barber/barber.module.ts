import { Module } from '@nestjs/common';
import { BarberService } from './barber.service';
import { BarberController } from './barber.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barber } from 'src/database/entities/barber.entity';
import { Rating } from 'src/database/entities/rating.entity';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Barber, Rating, User])],
  providers: [BarberService],
  controllers: [BarberController],
  exports: [BarberService],
})
export class BarberModule {}
