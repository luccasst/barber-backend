import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Barber } from './barber.entity';

@Entity('services')
export class ServicesBarber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToMany(() => Barber, (barber) => barber.services)
  barbers: Barber[];
}
/* @ManyToOne(() => Barber, (barber) => barber.services)
barber: Barber; */
