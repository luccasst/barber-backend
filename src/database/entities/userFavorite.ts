import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserFavorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  barberId: number;
}
