import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientUser } from './clientUser.entity';

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

  @OneToOne(() => ClientUser, (candidate) => candidate.address)
  candidateId: ClientUser;

  //   @OneToOne(() => Collaborator, (collaborator) => collaborator.address)
  //   collaboratorId: Collaborator;

  //   @OneToOne(() => Client, (client) => client.address)
  //   clientId: Client;

  //   @OneToOne(() => Dealer, (dealer) => dealer.address)
  //   dealerId: Dealer;
}
