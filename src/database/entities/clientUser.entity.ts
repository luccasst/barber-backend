import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as crypto from 'crypto';
import { Address } from './address.entity';
import { User } from './user.entity';
import { UserRole } from 'src/enum/role.enum';

@Entity('clientUser')
export class ClientUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ nullable: true })
  urlPhoto: string | null;

  @Column({ unique: true, nullable: true })
  cpf: string | null;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  cellphoneNumber: string | null;

  @Column()
  password: string;

  @Column({
    type: 'text',
    enum: UserRole,
    default: UserRole.ClientUser,
  })
  role: UserRole | string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  users: User;

  @ManyToOne(() => Address, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  address: Address;
}
