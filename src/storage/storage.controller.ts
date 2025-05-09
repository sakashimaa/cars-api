import {
  Controller,
  Post,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';

interface MulterFile {
  /** Field name specified in the form */
  fieldname: string;
  /** Name of the file on the user's computer */
  originalname: string;
  /** Encoding type of the file */
  encoding: string;
  /** Mime type of the file */
  mimetype: string;
  /** Size of the file in bytes */
  size: number;
  /** The folder to which the file has been saved (DiskStorage) */
  destination?: string;
  /** The name of the file within the destination (DiskStorage) */
  filename?: string;
  /** Location of the uploaded file (DiskStorage) */
  path?: string;
  /** A Buffer of the entire file (MemoryStorage) */
  buffer: Buffer;
}

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: MulterFile) {
    if (!file || !file.buffer) {
      throw new BadRequestException('Файл не предоставлен или некорректен');
    }

    // Извлекаем имя файла и расширение
    const originalName = file.originalname;
    const fileNameParts = originalName.split('.');
    const extension = fileNameParts.length > 1 ? fileNameParts.pop() : '';
    const fileName = fileNameParts.join('.');

    // Формируем ключ для хранения
    const key = fileName + (extension ? '.' + extension : '');

    try {
      // Загружаем файл в хранилище
      await this.storageService.uploadFile(key, file.buffer, file.mimetype);

      return {
        message: 'Файл успешно загружен',
        fileName: key,
      };
    } catch (error) {
      throw new BadRequestException(
        'Ошибка при загрузке файла: ' + error.message,
      );
    }
  }

  @Get(':fileName')
  async getFile(@Param('fileName') fileName: string) {
    try {
      const fileUrl = await this.storageService.getFileUrl(fileName);
      return { url: fileUrl };
    } catch (error) {
      throw new BadRequestException(
        'Ошибка при получении файла: ' + error.message,
      );
    }
  }
}
