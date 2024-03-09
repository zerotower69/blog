import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClassModel } from '../../models';
import { Res } from '../../response';
import { PageDto } from '../dto/page';
import { getPageOffset, getUpdateData } from '../../utils';
import { AddDto } from '../dto/class/add.dto';
import { UpdateDto } from '../dto/class/update.dto';
import dayjs from 'dayjs';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(ClassModel)
    private classModel: typeof ClassModel,
  ) {}

  //查询所有
  async listAll() {
    try {
      const data = await this.classModel.findAndCountAll();
      return Res.OkWithList(data.rows);
    } catch (e) {
      return Res.Error(e.message);
    }
  }

  //分页查询
  async listByPage(data: PageDto) {
    try {
      const offset = getPageOffset(data.page, data.limit);
      const result = await this.classModel.findAndCountAll({
        limit: data.limit,
        offset: offset,
      });
      return Res.OKWithPage(result.rows, data.limit, data.page, result.count);
    } catch (e) {
      return Res.Error(e.message);
    }
  }

  //按id查
  async findById(id: number) {
    try {
      const data = await this.classModel.findByPk(id);
      if (data) {
        return Res.OKWithData(data);
      } else {
        return Res.Error('该分类不存在');
      }
    } catch (e) {
      return Res.Error(e.message);
    }
  }

  //按分类名查
  async findByName(name: string) {
    try {
      const data = await this.classModel.findOne({
        where: {
          name,
        },
      });
      if (data) {
        return Res.OKWithData(data);
      } else {
        return Res.Error('分类不存在');
      }
    } catch (e) {
      return Res.Error(e.message);
    }
  }

  //新增分类
  async add(data: AddDto) {
    try {
      const foundClass = await this.classModel.findOne({
        where: {
          name: data.name,
        },
      });
      if (foundClass) {
        return Res.Error('分类已存在');
      }
      const result = await this.classModel.create({
        ...data,
      });
      return Res.OKWithData(result);
    } catch (e) {
      return Res.Error(e.message);
    }
  }

  //修改分类
  async update(id: number, data: UpdateDto) {
    try {
      const updateData = getUpdateData(data);
      const [count] = await this.classModel.update(updateData, {
        where: {
          id: id,
        },
      });
      return Res.OKWithData(count);
    } catch (e) {
      return Res.Error(e.message);
    }
  }

  //删除分类
  async delete(id: number) {
    try {
      const count = await this.classModel.destroy({
        where: {
          id: id,
        },
      });
      return Res.OKWithData(count, count > 0 ? '删除成功' : 'id不存在');
    } catch (e) {
      return Res.Error(e.message);
    }
  }

  async batchDelete(ids: string) {
    try {
      const idList = ids.split(',').map((id) => parseInt(id));
      const count = await this.classModel.destroy({
        where: {
          id: idList,
        },
      });
      return Res.OKWithData(count, count > 0 ? '删除成功' : '有id不存在');
    } catch (e) {
      return Res.Error(e.message);
    }
  }
}
