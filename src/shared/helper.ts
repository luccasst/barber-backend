import { Request } from 'express';
import { extname } from 'path';
import { promisify } from 'util';
import { unlink } from 'fs';

const unlinkAsync = promisify(unlink);

export class HelperFile {
  static customFilename(req: Request, file: Express.Multer.File, cb: any) {
    const randonName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    const nameFile = cb(null, `${randonName}${extname(file.originalname)}`);
    return nameFile;
  }

  static async removeFile(file: string) {
    try {
      await unlinkAsync(file);
    } catch (error) {
      throw new Error('Arquivo não encotnrado');
    }
    return true;
  }
}
