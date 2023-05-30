//contém estrutura de uma requisição que foi autenticada
import { Request } from 'express';
import { User } from 'src/database/entities/user.entity';
import { Barber } from 'src/database/entities/barber.entity';

export interface AuthRequest extends Request {
  user: User | Barber;
}
