import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BarberTestimonial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  barberId: number;

  @Column()
  name: string;

  @Column()
  rate: number;

  @Column()
  body: string;
}
