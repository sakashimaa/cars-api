import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { WorkersService } from './workers.service';
import { Worker } from './worker.entity';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtAdminAuthGuard } from '../admin/guards/jwt-admin-auth.guard';
import { Review } from './review.entity';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Get()
  findAll(): Promise<Worker[]> {
    return this.workersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Worker> {
    return this.workersService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAdminAuthGuard)
  create(@Body() createWorkerDto: CreateWorkerDto): Promise<Worker> {
    return this.workersService.create(createWorkerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAdminAuthGuard)
  remove(@Param('id') id: string): Promise<void> {
    return this.workersService.remove(+id);
  }

  @Post(':id/reviews')
  async addReview(
    @Param('id') workerId: number,
    @Body() reviewData: Partial<Review>,
  ): Promise<Review> {
    return this.workersService.addReview(workerId, reviewData);
  }

  @Get(':id/reviews')
  async getReviews(@Param('id') workerId: number): Promise<Review[]> {
    return this.workersService.getReviews(workerId);
  }
}
