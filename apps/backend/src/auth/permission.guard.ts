import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { RoleService } from '../user/role.service';
import { Request } from 'express';
import { PermissionModel } from '../models';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(RoleService)
  private roleService: RoleService;

  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (!request.user) {
      return true;
    }

    //需要查的角色
    let requiredRoles = this.reflector.getAllAndOverride('require-role', [context.getClass(), context.getHandler()]) ?? [];
    requiredRoles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    const requiredPermissions: string[] =
      this.reflector.getAllAndOverride('require-permission', [context.getClass(), context.getHandler()]) ?? [];

    // console.log(requiredPermissions)

    //没有需要查询的权限，放行通过
    if (requiredPermissions.length === 0 && requiredRoles.length === 0) {
      return true;
    }

    if (requiredRoles.length) {
      const requestRoles = (request?.user?.roles ?? []).map((role) => role.code);
      const hasRole = requestRoles.some((role) => requiredRoles.includes(role));
      return hasRole;
    }

    const roles = await this.roleService.findRolesByIds(request.user?.roles?.map((item) => item.id) ?? []);
    const permissions: PermissionModel[] = roles.reduce((total: PermissionModel[], current) => {
      total.push(...current.permissions);
      return total;
    }, []);

    for (let i = 0; i < requiredPermissions.length; i++) {
      const curPerm = requiredPermissions[i];
      const found = permissions.find((item) => item.name === curPerm);
      if (!found) {
        throw new UnauthorizedException('你没有访问的权限');
      }
    }
    return true;
  }
}
