import { Module } from '@nestjs/common';
import { BarberService } from './barber.service';
import { BarberController } from './barber.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barber } from 'src/database/entities/barber';

@Module({
  imports: [TypeOrmModule.forFeature([Barber])],
  providers: [BarberService],
  controllers: [BarberController],
  exports: [BarberService],
})
export class BarberModule {}
