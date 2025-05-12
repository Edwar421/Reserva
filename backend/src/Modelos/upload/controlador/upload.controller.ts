import { Controller, Post, UploadedFile, UseInterceptors, HttpException, HttpStatus, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../servicios/upload.services';
import { BadRequestException } from '@nestjs/common';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // Endpoint para subir archivos de texto (reservas y espacios)
  @Post('txt')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: txtFileFilter, // Usamos el filtro de archivos .txt
  }))
  async uploadTxt(@UploadedFile() file: Express.Multer.File): Promise<{ message: string }> {
    try {
      await this.uploadService.processTxtFile(file);
      return { message: 'Archivo .txt procesado y datos cargados correctamente' };
    } catch (error) {
      throw new HttpException('Failed to upload or process file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

// Filtro para aceptar solo archivos .txt
export const txtFileFilter = (req, file, callback) => {
  if (!file.mimetype.match(/\/text\/plain$/)) {
    return callback(new BadRequestException('Only .txt files are allowed!'), false);
  }
  callback(null, true);
};
