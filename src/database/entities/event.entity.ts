import { EventStatus } from 'src/enum/status.enum';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';

export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ nullable: true })
  urlPhoto: string | null;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'interval' })
  duration: string;

  @Column({
    type: 'text',
    enum: EventStatus,
    default: EventStatus,
  })
  status: EventStatus | string;

  @Column({ type: 'boolean', default: false })
  highlight: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Address, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  address: Address;
}
