import { Inject, Injectable, Optional } from '@nestjs/common';
import { UploadFileOptions } from './file.options';
import { FILE_MODULE_OPTIONS } from './file.constants';
import { InjectModel } from '@nestjs/sequelize';
import { FileModel } from '../models/file/file.model';
import { AddDto } from './dto/add.dto';
import { computeFileHash, deleteFile, getRelativeFilepath } from '../utils';
import { Res } from '../response';
import { Express } from 'express';
import { QiniuService } from '@common/bucket';
import { CosService } from '@common/bucket';

@Injectable()
export class FileService {
  private options: UploadFileOptions = {};
  constructor(
    @Optional()
    @Inject(FILE_MODULE_OPTIONS)
    private readonly fileOptions: UploadFileOptions,
    @InjectModel(FileModel)
    private fileModel: typeof FileModel,
    private qiniuService: QiniuService,
    private cosService: CosService,
  ) {
    this.options = Object.assign(this.options, fileOptions);
  }

  //新增文件记录
  async addOne(data: AddDto) {
    try {
      const found = await this.fileModel.findOne({
        where: {
          hash: data.hash,
        },
      });
      if (found) {
        return found;
      }
      return await this.fileModel.create({
        ...data,
      });
    } catch (e) {
      return null;
    }
  }

  //通过hash寻找文件记录
  async findByHash(hash: string) {
    try {
      return await this.fileModel.findOne({
        where: {
          hash: hash,
        },
      });
    } catch (e) {
      return null;
    }
  }

  async uploadImage(file: Express.Multer.File) {
    try {
      const filepath = file.path;
      const hash = await computeFileHash(filepath);
      const found = await this.findByHash(hash);
      if (found) {
        await deleteFile(filepath);
        return Res.OKWithData(found);
      }
      const resp = await this.cosService.uploadFile(filepath, file.originalname, 'image');
      if (resp.statusCode === 200) {
        const location = resp.Location;

        const newData: AddDto = {
          hash,
          // path: getRelativeFilepath(filepath),
          filesize: file.size,
          filename: file.originalname,
          bucket: 'cos',
          url: location,
          is_img: true,
        };
        const result = await this.addOne(newData);
        if (!result) {
          return Res.Error();
        }
        await deleteFile(filepath);
        return Res.OKWithData(result);
      } else {
        await deleteFile(filepath);
        return Res.Error('上传失败');
      }
    } catch (e) {
      return Res.Error(e.message ?? e);
    }
  }
}
