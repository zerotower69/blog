import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PermissionModel, RoleModel } from '../models';
import { Op } from 'sequelize';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleModel)
    private roleModel: typeof RoleModel,
  ) {}
  async findRolesByIds(roleIds: number[]) {
    return this.roleModel.findAll({
      where: {
        id: {
          [Op.in]: roleIds,
        },
      },
      attributes: {
        exclude: [],
      },
      include: [
        {
          model: PermissionModel,
          through: { attributes: [] },
        },
      ],
    });
  }
}
