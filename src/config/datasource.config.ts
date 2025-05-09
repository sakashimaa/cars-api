import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from '../users/user.entity';
import { EmailVerification } from '../email/email-verification.entity';

// Загрузка переменных окружения
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get('DB_PORT', 5432),
  username: configService.get('DB_USERNAME', 'postgres'),
  password: configService.get('DB_PASSWORD', 'qwerty123'),
  database: configService.get('DB_DATABASE', 'cars_api'),
  entities: [User, EmailVerification],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
