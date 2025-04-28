import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.MAIL_PORT || '587', 10),
  user: process.env.MAIL_USER || 'smetankahutao@gmail.com',
  password: process.env.MAIL_PASSWORD || 'parm ndfe bczm tfvn',
  from: process.env.MAIL_FROM || 'Авто 2 в 1 smetankahutao@gmail.com',
}));