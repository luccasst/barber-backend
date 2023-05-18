import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
<<<<<<< HEAD
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { User } from './database/entities/user.entity';
=======
>>>>>>> ef2e31a794f74d2aaf4b6e2da59b55a583b07c52

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
<<<<<<< HEAD

  @Get('me')
  getMe(@CurrentUser() currentUser: User) {
    return currentUser;
  }
=======
>>>>>>> ef2e31a794f74d2aaf4b6e2da59b55a583b07c52
}
