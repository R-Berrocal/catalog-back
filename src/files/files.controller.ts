import {
  Controller,
  Post,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

import { fileFilter } from './helpers';
import { FilesService } from './files.service';

@ApiTags('Files - Get and Upload')
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(FilesInterceptor('files', 5, { fileFilter }))
  uploadProductImage(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.filesService.uploadImages('products/images', files);
  }
}
