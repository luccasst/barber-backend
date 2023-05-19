import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BarberPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  barberId: number;

  @Column()
  url: string;
}
