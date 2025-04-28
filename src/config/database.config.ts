import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get('DB_PORT', 5432),
  username: configService.get('DB_USERNAME', 'postgres'),
  password: configService.get('DB_PASSWORD', 'cfiflfey228A!'),
  database: configService.get('DB_NAME', 'cars_api'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // Только для разработки! В продакшене рекомендуется использовать миграции
});