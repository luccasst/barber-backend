import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Barber } from './barber.entity';

@Entity()
export class ServicesBarber {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => Barber, (barber) => barber.services)
  barber: Barber;
}
