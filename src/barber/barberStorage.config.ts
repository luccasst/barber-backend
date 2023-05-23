import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

// armazenar as imagens do cliente na raiz do modulo de cliente
export const barberMulterConfig = {
  dest: './upload/avatar',
};

export const barberMulterOptions = {
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpeg|png|gif|)$/)) {
      // permitir armazenamento
      cb(null, true);
    } else {
      // rejeitar
      cb(
        new HttpException(
          `Unsupoported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },

  // propriedades de armazenamento
  storage: diskStorage({
    // detalhes do destino do armazenamento
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = barberMulterConfig.dest;
      // criar diretório se nao existir
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },

    // detalhes de modificação do arquivo
    filename: (req: any, file: any, cb: any) => {
      const email = req.user.email;
      // chamando a callback passando uma timestamp com a extensao original do nome
      cb(null, `${Date.now()}${extname(file.originalname)}`);
    },
  }),
};
