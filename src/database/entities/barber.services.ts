import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BarberService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  barberId: number;

  @Column()
  name: string;

  @Column()
  price: number;
}
