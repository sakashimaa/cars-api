import { registerAs } from '@nestjs/config';

export default registerAs('s3', () => ({
  endpoint: process.env.S3_ENDPOINT || 'https://storage.yandexcloud.net',
  region: process.env.S3_REGION || 'ru-central1',
  bucket: process.env.S3_BUCKET || 'car-images',
  accessKeyId: process.env.S3_ACCESS_KEY_ID || 'YCAJEI1Gfb858oWiPRkSkr2YB',
  secretAccessKey:
    process.env.S3_SECRET_ACCESS_KEY ||
    'YCOjX1EGFgKWMh2rasJrj-M0gFCmMIXeQrCqtXn8',
}));
