import {SetMetadata} from "@nestjs/common";


export const RequirePermission =(...permissions:string[])=>{
    return (target:any,propertyKey:string|symbol,descriptor:PropertyDescriptor)=>{
        SetMetadata('require-login',true)(target,propertyKey,descriptor)
        SetMetadata('require-permission',permissions)(target,propertyKey,descriptor)
    }
}

export const Permission = RequirePermission;
export const Perm = RequirePermission;