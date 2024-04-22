import { Injectable } from '@nestjs/common';
import { AddArticleDto } from '../dto/article/add.article.dto';
import { ArticleClassModel, ArticleModel, ArticleTagModel, ClassModel, TagModel } from '../../models';
import { InjectModel } from '@nestjs/sequelize';
import { ModifyArticleDto } from '../dto/article/modify.article.dto';
import { ArticlePageDto } from '../dto/article/article.page.dto';
import { Res } from '../../response';
import { Op, Optional, WhereOptions } from 'sequelize';
import { Attributes, FindAndCountOptions } from 'sequelize/types/model';
import { deleteKey, getPageOffset } from '../../utils';
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
      // deleteKey(article,'content');
      return Res.OKWithData(article);
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
        const transaction = await this.articleModel.sequelize.transaction();
        count = await this.articleModel.destroy({
          ...options,
          transaction,
        });
        //同时删除文章关联的标签和分类记录
        const relOptions = {
          where: {
            article_id: {
              [Op.in]: ids,
            },
          },
          transaction,
        };
        await this.articleClassModel.destroy(relOptions);
        await this.articleTagModel.destroy(relOptions);
        await transaction.commit();
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
      if (!Array.isArray(data.tagId) || data.tagId.length === 0) {
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
      if (Array.isArray(data.tagId)) {
        await this.articleTagModel.destroy({
          where: {
            article_id: articleId,
          },
          transaction,
        });
        for (const id of data.tagId) {
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
   * @param page
   * @param pageSize
   * @param data 分页数据和过滤条件
   */
  async listArticleByPage(page = 1, pageSize = 10, data: Partial<ArticlePageDto>) {
    try {
      const offset = getPageOffset(page, pageSize);
      const searchOptions: Omit<FindAndCountOptions<Attributes<ArticleModel>>, 'group'> = {
        limit: pageSize,
        offset,
        attributes: {
          exclude: ['content'],
        },
      };
      let whereOptions = {};
      //创建时间的范围
      if (isString(data.startTime) && isString(data.endTime)) {
        whereOptions = {
          ...whereOptions,
          createdAt: {
            [Op.gte]: dayjs(data.startTime).toDate(),
            [Op.lte]: dayjs(data.endTime).toDate(),
          },
        };
      }
      if (isString(data.title)) {
        //模糊匹配文章标题
        whereOptions = {
          ...whereOptions,
          title: {
            [Op.like]: `%${data.title}%`,
          },
        };
      }
      if (!data.showDelete) {
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
      //TODO:连表查询时，统计数目出现bug 2--3
      const tagWhereOptions = {};
      // if (Array.isArray(data.tagsId)) {
      //   tagWhereOptions = {
      //     id: {
      //       [Op.in]: data.tagsId,
      //     },
      //   };
      // }
      //tag标签id
      // searchOptions.include = [
      //   {
      //     model: TagModel,
      //     attributes: ['id', 'name'],
      //     where: tagWhereOptions,
      //     through: { attributes: [] },
      //   },
      // ];
      //是否按创建时间范围排序
      searchOptions.order = [['createdAt', data.desc ? 'DESC' : 'ASC']];
      //TODO:加上按标签查，按分类查
      const { rows, count } = await this.articleModel.findAndCountAll(searchOptions);
      // console.log(rows, count);
      return Res.OKWithPage(rows, pageSize, page, count);
    } catch (e) {
      return Res.ServerError(e.message || e);
    }
  }

  /**
   * 由文章Id获得文章详情(web端查看详情)
   * @param id 文章id
   */
  async getArticleDetails(id: string) {
    try {
      const res = await this.articleModel.findByPk(id, {
        include: [
          {
            model: TagModel,
            attributes: ['id', 'name'],
            through: {
              attributes: [],
            },
          },
          {
            model: ClassModel,
            attributes: ['id', 'name'],
            through: {
              attributes: [],
            },
          },
        ],
      });
      return Res.OKWithData(res);
    } catch (e) {
      return Res.ServerError(e.message || e);
    }
  }

  /**
   * 由文章Id获得文章详情(admin端查看详情)
   * @param id 文章id
   */
  async adminGetArticleDetails(id: string) {
    try {
      const article = await this.articleModel.findByPk(id, {
        include: [
          {
            model: TagModel,
            attributes: ['id'],
            through: {
              attributes: [],
            },
          },
          {
            model: ClassModel,
            attributes: ['id'],
            through: {
              attributes: [],
            },
          },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'like', 'read'],
        },
      });
      const data: Record<string, any> = {
        ...article.dataValues,
      };
      data.tagId = data.tags.map((item) => item.id);
      data.classId = data.classes.map((item) => item.id);
      deleteKey(data, 'tags', 'classes');
      return Res.OKWithData(data);
    } catch (e) {
      return Res.ServerError(e.message || e);
    }
  }
}
