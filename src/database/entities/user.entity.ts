import { UserRole } from 'src/enum/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientUser } from './clientUser.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({
    type: 'text',
    enum: UserRole,
    default: UserRole,
  })
  role: UserRole | string;

  @CreateDateColumn()
  createdAt: Date;

  // @OneToOne(() => ClientUser, {
  //   cascade: true,
  //   eager: true,
  // })
  @UpdateDateColumn()
  updatedAt: Date;
  typeUser: number;
}
