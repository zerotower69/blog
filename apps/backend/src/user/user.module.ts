import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleService } from './role.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel, RoleModel, PermissionModel } from '../models';

@Module({
  imports: [SequelizeModule.forFeature([UserModel, RoleModel, PermissionModel])],
  controllers: [UserController],
  providers: [UserService, RoleService],
  exports: [UserService, RoleService],
})
export class UserModule {}
