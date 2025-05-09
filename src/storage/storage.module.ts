import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { ConfigModule } from '@nestjs/config';
import s3Config from '../config/s3.config';

@Module({
  imports: [ConfigModule.forFeature(s3Config)],
  providers: [StorageService],
  controllers: [StorageController],
  exports: [StorageService],
})
export class StorageModule {}
