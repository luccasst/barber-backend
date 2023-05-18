import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { Admin } from 'src/database/entities/admin.entity';
import { AuthRequest } from '../models/authRequest';

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): any => {
  const request = context.switchToHttp().getRequest<AuthRequest>();

  return request.user;
});
