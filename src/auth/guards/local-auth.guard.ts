import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: { message: any }, admin: any) {
    if (err || !admin) {
      throw new UnauthorizedException(err?.message);
    }

    return admin;
  }
}
