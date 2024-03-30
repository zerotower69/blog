import { Injectable } from '@nestjs/common';
import { AddArticleDto } from '../dto/article/add.article.dto';
import { ArticleClassModel, ArticleModel, ArticleTagModel, ClassModel, TagModel } from '../../models';
import { InjectModel } from '@nestjs/sequelize';
import { ModifyArticleDto } from '../dto/article/modify.article.dto';
import { ArticlePageDto } from '../dto/article/article.page.dto';
import { Res } from '../../response';
import { Op, Optional, WhereOptions } from 'sequelize';
import { Attributes, FindAndCountOptions } from 'sequelize/types/model';
import { getPageOffset } from '../../utils';
import { PageDto } from '../dto/page';
import { isNumber, isString } from '../../utils/is';
import dayjs from 'dayjs';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(ArticleModel)
    private articleModel: typeof ArticleModel,
    @InjectModel(ClassModel)
    private classModel: typeof ClassModel,
    @InjectModel(TagModel)
    private tagModel: typeof TagModel,
    @InjectModel(ArticleClassModel)
    private articleClassModel: typeof ArticleClassModel,
    @InjectModel(ArticleTagModel)
    private articleTagModel: typeof ArticleTagModel,
  ) {}

  /**
   * 新增文章
   * @param data 新增文章数据
   */
  async addArticle(data: AddArticleDto) {
    try {
      //创建事务
      const transaction = await this.articleModel.sequelize.transaction();
      const article = await this.articleModel.create(
        {
          ...data,
          like: 0,
          read: 0,
          is_delete: false,
        },
        { transaction },
      );
      for (const id of data.classId) {
        const res = await this.classModel.findByPk(id);
        if (res) {
          await this.articleClassModel.create(
            {
              article_id: article.id,
              class_id: id,
            },
            { transaction },
          );
        }
      }
      for (const id of data.tagId) {
        const res = await this.tagModel.findByPk(id);
        if (res) {
          await this.articleTagModel.create(
            {
              article_id: article.id,
              tag_id: id,
            },
            { transaction },
          );
        }
      }
      //提交事务
      await transaction.commit();
      return Res.OK();
    } catch (e) {
      return Res.ServerError(e.message || e);
    }
  }

  /**
   * 根据文章id删除文章,可删除多篇
   * @param ids 要删除的文章ids
   * @param softDelete 文章是否软删除
   */
  async deleteArticle(ids: string[], softDelete = false) {
    try {
      let count = 0;
      const options = {
        where: {
          id: {
            [Op.in]: ids,
          },
        },
      };
      if (softDelete) {
        const res = await this.articleModel.update(
          {
            is_delete: true,
          },
          options,
        );
        count = res[0];
      } else {
        count = await this.articleModel.destroy(options);
      }
      return Res.OK('ok', 200, count);
    } catch (e) {
      return Res.ServerError(e.message || e);
    }
  }

  /**
   * 更改文章
   * @param id 要更改文章的id
   * @param data 修改的内容
   */
  async modifyArticle(id: string, data: ModifyArticleDto) {
    try {
      const articleId = id;
      if (!Array.isArray(data.tagsId) || data.tagsId.length === 0) {
        throw new Error('标签名不能为空');
      }
      const transaction = await this.articleModel.sequelize.transaction();
      const [effect] = await this.articleModel.update(
        {
          ...data,
        },
        {
          where: {
            id: id,
          },
          transaction,
        },
      );
      const tasks = [];
      //先删除分类和标签再增加
      if (Array.isArray(data.classId)) {
        await this.articleClassModel.destroy({
          where: {
            article_id: articleId,
          },
          transaction,
        });
        for (const id of data.classId) {
          await this.articleClassModel.create(
            {
              article_id: articleId,
              class_id: id,
            },
            { transaction },
          );
        }
      }
      if (Array.isArray(data.tagsId)) {
        await this.articleTagModel.destroy({
          where: {
            article_id: articleId,
          },
          transaction,
        });
        for (const id of data.tagsId) {
          await this.articleTagModel.create(
            {
              article_id: articleId,
              tag_id: id,
            },
            { transaction },
          );
        }
      }
      //提交事务
      await transaction.commit();
      return Res.OK();
    } catch (e) {
      return Res.ServerError(e.message || e);
    }
  }

  /**
   * 分页查询文章
   * @param data 分页数据
   * @param options 其他过滤条件
   */
  async listArticleByPage(data: PageDto, options: Partial<ArticlePageDto> = {}) {
    try {
      const offset = getPageOffset(data.page, data.limit);
      const searchOptions: Omit<FindAndCountOptions<Attributes<ArticleModel>>, 'group'> = {
        limit: data.limit,
        offset,
        attributes: {
          exclude: ['content'],
        },
      };
      let whereOptions = {};
      //创建时间的范围
      if (isString(options.startTime) && isString(options.endTime)) {
        whereOptions = {
          ...whereOptions,
          createdAt: {
            [Op.gte]: dayjs(options.startTime).toDate(),
            [Op.lte]: dayjs(options.endTime).toDate(),
          },
        };
      }
      if (isString(options.title)) {
        //模糊匹配文章标题
        whereOptions = {
          ...whereOptions,
          title: {
            [Op.like]: `%${options.title}%`,
          },
        };
      }
      if (!options.showDelete) {
        //只请求没有被软删除的文章
        searchOptions.where = {
          ...whereOptions,
          [Op.not]: [
            {
              is_delete: true,
            },
          ],
        };
      }
      let tagWhereOptions = {};
      if (Array.isArray(options.tagsId)) {
        tagWhereOptions = {
          id: {
            [Op.in]: options.tagsId,
          },
        };
      }
      //tag标签id
      searchOptions.include = [
        {
          model: TagModel,
          attributes: ['id', 'name'],
          where: tagWhereOptions,
          through: { attributes: [] },
        },
      ];
      //是否按创建时间范围排序
      searchOptions.order = [['createdAt', options.desc ? 'DESC' : 'ASC']];
      //TODO:加上按标签查，按分类查
      const { rows, count } = await this.articleModel.findAndCountAll(searchOptions);
      return Res.Page(rows, data.limit, data.page, count);
    } catch (e) {
      return Res.ServerError(e.message || e);
    }
  }

  /**
   * 由文章Id获得文章详情
   * @param id 文章id
   */
  async getArticleDetails(id: string) {
    try {
      const res = await this.articleModel.findByPk(id);
      return Res.OKWithData(res);
    } catch (e) {
      return Res.ServerError(e.message || e);
    }
  }
}
