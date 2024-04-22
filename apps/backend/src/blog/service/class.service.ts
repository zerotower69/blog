import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ArticleClassModel, ClassModel } from '../../models';
import { Res } from '../../response';
import { PageDto } from '../dto/page';
import { getPageOffset, getUpdateData } from '../../utils';
import { AddDto } from '../dto/class/add.dto';
import { UpdateDto } from '../dto/class/update.dto';
import dayjs from 'dayjs';
import { ListDto } from '../dto/class/list.dto';
import { Attributes, FindAndCountOptions } from 'sequelize/types/model';
import { Op } from 'sequelize';
import { isString } from '../../utils/is';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(ClassModel)
    private classModel: typeof ClassModel,
    @InjectModel(ArticleClassModel)
    private articleClassModel: typeof ArticleClassModel,
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
  async listByPage(data: ListDto) {
    try {
      const offset = getPageOffset(data.page, data.pageSize);
      const options: Omit<FindAndCountOptions<Attributes<ClassModel>>, 'group'> = {
        limit: data.pageSize,
        offset,
      };
      const whereOptions = {};
      //如果有分类名，模糊匹配
      if (data.name) {
        whereOptions['name'] = {
          [Op.like]: `%${data.name}%`,
        };
      }
      //创建时间范围内
      if (isString(data.startTime) && isString(data.endTime)) {
        whereOptions['createdAt'] = {
          [Op.gte]: new Date(data.startTime),
          [Op.lte]: new Date(data.endTime),
        };
      }
      options.where = whereOptions;
      const result = await this.classModel.findAndCountAll(options);
      return Res.OKWithPage(result.rows, data.pageSize, data.page, result.count);
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

  //删除数据
  async deleteData(ids: string) {
    try {
      const idList = ids.split(',').map((id) => parseInt(id));
      const record = await this.articleClassModel.findOne({
        where: {
          class_id: {
            [Op.in]: idList,
          },
        },
      });
      if (record) {
        //分类已经被使用
        return Res.Error('该分类已经被文章引用');
      }
      const count = await this.classModel.destroy({
        where: {
          id: idList,
        },
      });
      return Res.OKWithData(count, '删除成功');
    } catch (e) {
      return Res.Error(e.message);
    }
  }
}
