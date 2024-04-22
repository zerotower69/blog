import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

/**
 * 计算文件的hash
 * @param filepath 文件路径
 * @param algorithm 算法名，默认sha256
 */
export async function computeFileHash(filepath: string, algorithm = 'sha256') {
  try {
    filepath = path.resolve(process.cwd(), filepath);
    const buffer = fs.readFileSync(filepath);
    const hash = crypto.createHash(algorithm);
    hash.update(buffer);
    return hash.digest('hex');
  } catch (e) {
    return Promise.reject(e.message ?? e);
  }
}

/**
 * 删除文件
 * @param filepath 文件路径
 */
export function deleteFile(filepath: string) {
  return new Promise((resolve, reject) => {
    fs.unlink(filepath, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(void 0);
      }
    });
  });
}

/**
 * 获得文件相对路径
 * @param filepath 文件路径
 */
export function getRelativeFilepath(filepath: string) {
  return filepath.replace(process.cwd(), '');
}
