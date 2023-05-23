import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Barber } from './barber.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  stars: number;

  @Column()
  comment: string;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  @ManyToOne(() => Barber, (barber) => barber.ratings)
  barber: Barber;

  @Column()
  userId: string;

  @Column()
  barberId: string;

  @Column()
  weekday: number;

  @Column('text')
  hours: string;
}
