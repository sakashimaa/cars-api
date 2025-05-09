import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CombinedAuthGuard } from '../auth/guards/combined-auth.guard';
import { JwtAdminAuthGuard } from '../admin/guards/jwt-admin-auth.guard';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  findAll(): Promise<Car[]> {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Car> {
    return this.carsService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAdminAuthGuard)
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carsService.create(createCarDto);
  }

  @Put(':id')
  @UseGuards(JwtAdminAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<Car> {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  @UseGuards(JwtAdminAuthGuard)
  remove(@Param('id') id: string): Promise<void> {
    return this.carsService.remove(+id);
  }
}
