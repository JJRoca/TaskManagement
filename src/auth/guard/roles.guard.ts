import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // if there are no roles defined, then allow access
    if (!roles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const hasRole = roles.includes(user?.role);
    if (!hasRole) {
      // if the user does not have the role authorized, then throw an exception
      throw new ForbiddenException('You do not have permission, Access Denied');
    }
    // console.log('roles:', roles, user);
    return true;
  }
}
