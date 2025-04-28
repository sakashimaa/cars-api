import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkersController } from './workers.controller';
import { WorkersService } from './workers.service';
import { Worker } from './worker.entity';
import { Review } from './review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Worker, Review])],
  controllers: [WorkersController],
  providers: [WorkersService],
  exports: [WorkersService],
})
export class WorkersModule {}