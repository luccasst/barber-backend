import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginValidationMiddleware } from './middlewares/login-validation';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
// import { LocalStrategyClient } from './strategies/localClient.strategy';

import * as dotenv from 'dotenv';
import { UserClientModule } from 'src/user-client/user-client.module';

dotenv.config();

@Module({
  imports: [
    UserClientModule,
    UserModule,
    JwtModule.register({
      privateKey: 'super_secret',
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
