import { Exclude } from 'class-transformer';
import { User } from 'src/database/entities/user.entity';

export class ListUser extends User {
  id: string;

  name: string;

  email: string;

  @Exclude()
  password: string;

  role: string;

  createdAt: Date;

  updatedAt: Date;
}
