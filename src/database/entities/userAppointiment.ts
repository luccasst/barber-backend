import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserAppointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  barberId: number;

  @Column()
  apDatetime: Date;
}
