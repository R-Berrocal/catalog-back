import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import streamifier = require('streamifier');

@Injectable()
export class FilesService {
  async uploadImages(folder: string, files: Array<Express.Multer.File>) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Make sure that the files is an image');
    }

    const uploadPromises = files.map((file) => {
      const imageUploaded = new Promise<UploadApiResponse>(
        (resolve, reject) => {
          const upload = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );

          streamifier.createReadStream(file.buffer).pipe(upload);
        },
      );

      return imageUploaded;
    });

    const results = await Promise.all(uploadPromises);

    return { secureUrls: results.map((result) => result.secure_url) };
  }
}
