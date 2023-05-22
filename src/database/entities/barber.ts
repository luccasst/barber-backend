import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Barber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 'default.png' })
  avatar: string;

  @Column({ default: 0 })
  stars: number;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column()
  services: string;
}
