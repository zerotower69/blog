import { SetMetadata } from '@nestjs/common';

export const RequireRole = (...roles: string[]) => {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    SetMetadata('require-login', true)(target, propertyKey, descriptor);
    SetMetadata('require-role', roles)(target, propertyKey, descriptor);
  };
};

export const Role = RequireRole;
