import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtAdminAuthGuard } from '../admin/guards/jwt-admin-auth.guard';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async findAll(
    @Query('name') name?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ): Promise<Service[]> {
    // Если задан параметр поиска по имени
    if (name) {
      return this.servicesService.findByName(name);
    }

    // Если задан диапазон цен
    if (minPrice !== undefined && maxPrice !== undefined) {
      return this.servicesService.findByPriceRange(minPrice, maxPrice);
    }

    // По умолчанию возвращаем все услуги
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Service> {
    return this.servicesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAdminAuthGuard)
  create(
    @Body(ValidationPipe) createServiceDto: CreateServiceDto,
  ): Promise<Service> {
    return this.servicesService.create(createServiceDto);
  }

  @Put(':id')
  @UseGuards(JwtAdminAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @UseGuards(JwtAdminAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.servicesService.remove(id);
  }
}
