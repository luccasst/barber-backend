import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BarberReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  barberId: number;

  @Column()
  rate: number;
}
