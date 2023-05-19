import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BarberAvailability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  barberId: number;

  @Column()
  weekday: number;

  @Column('text')
  hours: string;
}
