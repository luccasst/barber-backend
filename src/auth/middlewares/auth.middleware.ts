import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthMiddleware {
  static adminRepository: any;
  constructor(
    @InjectRepository(User)
    private readonly adminRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const { email } = req.body;
    if (email === '' || email === undefined) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  }

  public static async passwordValidation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { email, password } = req.body;
    if (password === '' || password === undefined) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const adminPassword = this.adminRepository.findOne({
      where: { email: email },
    });
    if (adminPassword) {
      const isPasswordValid = bcrypt.compareSync(
        password,
        adminPassword.password,
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
    }
    next();
  }

  public static async roleValidation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { role } = req.body;
    if (role === '' || role === undefined) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (role !== 'admin' && role !== 'user') {
      return res.status(401).json({ message: 'Incorrect role' });
    }
    next();
  }
}
