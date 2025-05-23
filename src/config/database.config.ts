import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get('DB_PORT', 5432),
  username: configService.get('DB_USERNAME', 'postgres'),
  password: configService.get('DB_PASSWORD', 'qwerty123'),
  database: configService.get('DB_NAME', 'cars_api'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false, // Отключаем synchronize, так как будем использовать миграции
  migrationsRun: true, // Автоматически запускать миграции при старте приложения
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
});
