import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { CONFIG } from '../config';

export const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = CONFIG?.['server']?.uploadPath ?? 'upload';
    try {
      fs.mkdirSync(path.join(process.cwd(), uploadPath));
    } catch (e) {}

    cb(null, path.join(process.cwd(), uploadPath));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});
