import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ArticleTagModel, TagModel } from '../../models';
import { Res } from '../../response';
import { getPageOffset } from '../../utils';
import { Op } from 'sequelize';
import { ListDto } from '../dto/tag/list.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(TagModel)
    private tagModel: typeof TagModel,
    @InjectModel(ArticleTagModel)
    private articleTagModel: typeof ArticleTagModel,
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
  async update(id: number, name: string) {
    try {
      const [count] = await this.tagModel.update(
        {
          name: name,
        },
        {
          where: {
            id: id,
          },
        },
      );
      if (count) {
        return Res.OKWithData(count);
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
  async listByPage(data: ListDto) {
    try {
      const offset = getPageOffset(data.page, data.pageSize);
      let whereOptions = {};
      if (data.name) {
        whereOptions = {
          name: {
            [Op.like]: `%${data?.name ?? ''}%`,
          },
        };
      }
      const { rows, count } = await this.tagModel.findAndCountAll({
        limit: data.pageSize,
        offset: offset,
        where: whereOptions,
      });
      return Res.OKWithPage(rows, data.pageSize, data.page, count);
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
      const tagRecord = await this.articleTagModel.findOne({
        rejectOnEmpty: undefined,
        where: {
          tag_id: id,
        },
      });
      if (tagRecord) {
        return Res.Error('标签已被文章引用，无法删除');
      }
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
      //寻找记录
      const tagRecord = await this.articleTagModel.findOne({
        rejectOnEmpty: undefined,
        where: {
          tag_id: {
            [Op.in]: idList,
          },
        },
      });
      if (tagRecord) {
        return Res.Error('标签已被文章引用，无法删除');
      }
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
