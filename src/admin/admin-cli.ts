import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    // Получаем DataSource
    const dataSource = app.get<DataSource>(getDataSourceToken());

    // Получаем репозиторий Admin
    const adminRepository = dataSource.getRepository(Admin);

    // Проверка существования хотя бы одного админа
    const adminCount = await adminRepository.count();

    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      // Создание супер-админа
      const admin = adminRepository.create({
        username: 'admin',
        password: hashedPassword,
        fullName: 'Главный Администратор',
        isSuperAdmin: true,
        permissions: [
          'users.manage',
          'cars.manage',
          'workers.manage',
          'services.manage',
        ],
        isActive: true,
      });

      await adminRepository.save(admin);

      console.log('✅ Аккаунт администратора успешно создан!');
      console.log('👨‍💼 Имя пользователя: admin');
      console.log('🔑 Пароль: admin123');
      console.log('⚠️  Пожалуйста, измените пароль после первого входа!');
    } else {
      console.log('👨‍💼 Аккаунт администратора уже существует.');
    }
  } catch (error) {
    console.error('❌ Ошибка при создании администратора:', error.message);
  } finally {
    await app.close();
  }
}

bootstrap();
