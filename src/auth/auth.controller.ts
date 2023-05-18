import { Controller, Post, UseGuards } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/authRequest';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest) {
    return await this.authService.login(req.user);
  }
}
