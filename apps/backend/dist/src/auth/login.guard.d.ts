import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleModel } from "../models";
declare module "express" {
    interface Request {
        user: {
            username: string;
            userId: number;
            roles: RoleModel[];
        };
    }
}
export declare class LoginGuard implements CanActivate {
    private reflector;
    private jwtService;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
