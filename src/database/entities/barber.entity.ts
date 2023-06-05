import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Rating } from './rating.entity';
import { Address } from './address.entity';
import { ServicesBarber } from './services.entity';
import { UserRole } from 'src/enum/role.enum';

@Entity()
export class Barber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @ManyToOne(() => User, (user) => user.barbers)
  user: User;

  @OneToMany(() => Rating, (rating) => rating.barber)
  ratings: Rating[];

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: 0 })
  stars: number;

  @Column({
    type: 'text',
    enum: UserRole,
    default: UserRole.BarberUser,
  })
  role: UserRole | string;

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

  @ManyToMany(() => ServicesBarber, (service) => service.barbers)
  @JoinTable()
  services: ServicesBarber[];
}
/* @OneToMany(() => ServicesBarber, (servicesBarber) => servicesBarber.barber)
@JoinColumn()
services: ServicesBarber[]; */
