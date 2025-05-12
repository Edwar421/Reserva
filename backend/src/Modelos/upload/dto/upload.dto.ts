import { BadRequestException } from '@nestjs/common';

export const txtFileFilter = (req, file, callback) => {
  // Verificar si el archivo tiene la extensión .txt
  if (!file.mimetype.match(/\/text\/plain$/)) {
    return callback(new BadRequestException('Only .txt files are allowed!'), false);
  }
  callback(null, true);
};
