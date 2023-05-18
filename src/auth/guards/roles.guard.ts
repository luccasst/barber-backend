import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/enum/role.enum';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const userRole = context.switchToHttp().getRequest().user.role;

    if (
      userRole === UserRole.SuperAdmin ||
      userRole === UserRole.GestSuperAdmin
    ) {
      return true;
    }

    throw new UnauthorizedException(
      'Você não tem permissão para atualizar a role de outro usuário.',
    );
  }
}
