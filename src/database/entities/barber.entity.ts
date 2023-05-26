import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Rating } from './rating.entity';
import { Address } from './address.entity';
import { ServicesBarber } from './services.entity';

@Entity()
export class Barber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.barbers)
  user: User;

  @OneToMany(() => Rating, (rating) => rating.barber)
  ratings: Rating[];

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: 0 })
  stars: number;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @OneToOne(() => Address, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  address: Address;

  @OneToMany(() => ServicesBarber, (servicesBarber) => servicesBarber.barber)
  services: ServicesBarber[];
}
