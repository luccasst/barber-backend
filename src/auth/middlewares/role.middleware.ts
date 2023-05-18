import { Request, Response, NextFunction } from 'express';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleMiddleware {
  static adminRepository: any;
  constructor(
    @InjectRepository(User)
    private readonly adminRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { role } = req.body;

    if (role === '' || role === undefined) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (
      role !== 'Master Admin' &&
      role != 'Super Admin' &&
      role !== 'Gest Super Admin' &&
      role !== 'Admin' &&
      role !== 'Previlege' &&
      role !== 'User'
    ) {
      return res.status(401).json({ message: 'invalid role type' });
    }

    next();
  }
}
