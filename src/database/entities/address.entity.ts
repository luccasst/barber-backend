import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientUser } from './clientUser.entity';
import { Barber } from './barber.entity';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  street: string;

  @Column()
  number: string;

  @Column()
  zipCode: string;

  @Column({ type: 'text' })
  city: string;

  @Column({ length: 2 })
  state: string;

  @Column({ type: 'text' })
  country: string;

  @OneToOne(() => Barber, (barber) => barber.address)
  barberId: Barber;

  @OneToOne(() => ClientUser, (candidate) => candidate.address)
  candidateId: ClientUser;
}
