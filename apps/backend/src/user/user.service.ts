import { HttpException, Inject, Injectable } from '@nestjs/common';
import { MyLogger } from '../winston/MyLogger';
import { WINSTON_LOGGER_TOKEN } from '../winston/winston.module';
import { UserModel } from '../models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterDto } from './dto/register.dto';
import { getPageOffset, md5 } from '../utils';
import { Res } from '../response';
import { LoginDto } from './dto/login.dto';
import { REDIS_TOKEN } from '../redis/redis.module';
import Redis from 'ioredis';
import {ForgetDto} from "./dto/forget.dto";
import {RoleModel, UserRoleModel} from "../models";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    @InjectModel(RoleModel)
    private roleModel:typeof RoleModel
  ) {}

  @Inject(WINSTON_LOGGER_TOKEN)
  private logger: MyLogger;

  @Inject(REDIS_TOKEN)
  private redisClient: Redis;

  //注册
  async register(user: RegisterDto) {
    const foundUser = await this.userModel.findOne({
      where: {
        username: user.username,
      },
    });

    if (foundUser) {
      throw new HttpException('用户已存在', 200);
    }

    try {
      //create方法合并了build方法和save方法
      //TODO:注册时实现更多的用户信息字段
      await this.userModel.create({
        username: user.username,
        password: md5(user.password),
        nickname:user.nickname
      });
      return Res.OK('注册成功');
    } catch (e) {
      return Res.Error('注册失败');
    }
  }

  //登录
  async login(user: LoginDto) {
    const foundUser = await this.userModel.findOne({
      where: {
        username: user.username,
      },
      include:[
        {
          model:RoleModel,
          attributes:["id",'code','name'],
          //中间关联表的字段
          through:{attributes:[]}
        }
      ]
    });

    if (!foundUser) {
      throw new HttpException('用户名不存在', 400);
    }
    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', 400);
    }
    return foundUser;
  }

  //用户列表
  async getList() {
    const list = await this.userModel.findAll({
      attributes: {
        //用户表查询不需要该字段
        exclude: ['password'],
      },
      //关联的用户表需要的字段
      include:[{
        model:RoleModel,
        attributes:["id",'code','name'],
        //中间关联表的字段
        through:{attributes:[]}
      }],
    });
    return Res.List(list);
  }

  //删除用户
  async deleteOne(userId:number){
     const foundUser = await this.userModel.findByPk(userId);
     if(foundUser){
       if(foundUser.username === 'admin'){
         return  Res.Error('管理员不能删除')
       } else{
         try{
           await this.userModel.destroy({
             where:{
               id:userId
             }
           })
           return Res.Result(204,null,'ok')
         } catch (e){
           return Res.Error(e.message)
         }
       }
     } else{
       return Res.Error('用户不存在')
     }
  }

  //TODO:普通用户重置密码
  async resetUserPassword(user:ForgetDto){

  }

  //TODO:普通用户修改个人信息
  async resetUserInfo(user){

  }

  //TODO:修改管理员密码
  async resetAdminPassword(user){

  }

  //TODO:设置用户角色
  async resetUserRole(user){

  }

  //获取用户信息
  async getUserInfo(userId:number){
    const foundUser = await this.userModel.findByPk(userId,{
      attributes:{
        exclude:['password']
      },
      include:[
        {
          model: RoleModel,
          attributes: ['id','code','name'],
          through:{attributes:[]}
        }
      ]
    })
    return foundUser
  }

  //分页获取用户列表
  async getListByPage(page = 1, limit = 10) {
    const { rows, count } = await this.userModel.findAndCountAll({
      attributes: {
        exclude: ['password'],
      },
      offset: getPageOffset(page, limit),
      limit: limit,
    });
    return Res.Page(rows, page, count);
  }


}
