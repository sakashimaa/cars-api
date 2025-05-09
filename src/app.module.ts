import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from './config/database.config';
import { CarsModule } from './cars/cars.module';
import { EmailModule } from './email/email.module';
import { WorkersModule } from './workers/workers.module';
import { TasksModule } from './tasks/tasks.module';
import { DetailsModule } from './details/details.module';
import { ServicesModule } from './services/services.module';
import { PaintingServicesModule } from './painting-services/painting-services.module';
import { AdminModule } from './admin/admin.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    CarsModule,
    EmailModule,
    WorkersModule,
    TasksModule,
    DetailsModule,
    ServicesModule,
    PaintingServicesModule,
    AdminModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
