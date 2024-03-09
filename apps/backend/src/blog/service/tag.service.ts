import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TagModel } from '../../models';
import { Res } from '../../response';
import { getPageOffset } from '../../utils';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(TagModel)
    private tagModel: typeof TagModel,
  ) {}

  //新增标签
  async add(name: string) {
    try {
      const foundTag = await this.tagModel.findOne({
        where: {
          name: name,
        },
      });
      if (foundTag) {
        return Res.Error('标签名已存在');
      }
      const tag = await this.tagModel.create({
        name,
      });
      if (tag) {
        return Res.OK('创建标签成功');
      } else {
        return Res.Error();
      }
    } catch (e) {
      return Res.Error(e.message);
    }
  }

  //修改标签
  async modify(id: number, name: string) {
    try {
      const [tag] = await this.tagModel.update(
        {
          name: name,
        },
        {
          where: {
            id: id,
          },
        },
      );
      if (tag) {
        return Res.OK();
      } else {
        return Res.Error('更新失败');
      }
    } catch (e) {
      return Res.Error(e.message);
    }
  }

  //查询所有的标签
  async listAll() {
    try {
      const list = await this.tagModel.findAll();
      return Res.List(list);
    } catch (e) {
      return Res.Error(e.message);
    }
  }

  //分页查询
  async listByPage(limit = 10, page = 1) {
    try {
      const offset = getPageOffset(page, limit);
      const data = await this.tagModel.findAndCountAll({
        limit: limit,
        offset: offset,
      });
      return Res.Page(data.rows, limit, page, data.count);
    } catch (e) {
      return Res.Error(e.message);
    }
  }

  //指定按id查询
  async listById(id: number) {
    try {
      const tag = await this.tagModel.findByPk(id);
      if (tag) {
        return Res.OKWithData(tag);
      } else {
        return Res.Error('id不存在');
      }
    } catch (e) {
      return Res.Error(e.message);
    }
  }

  //指定按标签名查找
  async findByName(name: string) {
    try {
      const foundTag = await this.tagModel.findOne({
        where: {
          name: name,
        },
      });
      if (foundTag) {
        return Res.OKWithData(foundTag);
      } else {
        return Res.Error('查找失败');
      }
    } catch (e) {
      return Res.Error(e.message);
    }
  }

  //删除一条
  async delete(id: number) {
    try {
      const data = await this.tagModel.destroy({
        where: {
          id: id,
        },
      });
      return Res.OKWithData(data, data > 0 ? '删除成功' : 'id不存在');
    } catch (e) {
      return Res.Error(e.message);
    }
  }

  //批量删除
  async batchDelete(ids: string) {
    try {
      const idList = ids.split(',').map((id) => parseInt(id));
      const data = await this.tagModel.destroy({
        where: {
          id: idList,
        },
      });
      return Res.OKWithData(data, data > 0 ? '删除成功' : '没有删除任何');
    } catch (e) {
      return Res.Error(e.message);
    }
  }
}
