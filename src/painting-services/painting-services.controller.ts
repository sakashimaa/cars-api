import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PaintingServicesService } from './painting-services.service';
import { CreatePaintingServiceDto } from './dto/create-painting-service.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('painting-services')
@Controller('painting-services')
export class PaintingServicesController {
    constructor(private readonly paintingServicesService: PaintingServicesService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новую услугу покраски' })
    @ApiResponse({ status: 201, description: 'Услуга успешно создана' })
    create(@Body() createPaintingServiceDto: CreatePaintingServiceDto) {
        return this.paintingServicesService.create(createPaintingServiceDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все услуги покраски' })
    @ApiResponse({ status: 200, description: 'Список всех услуг покраски' })
    findAll() {
        return this.paintingServicesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить услугу покраски по ID' })
    @ApiResponse({ status: 200, description: 'Услуга найдена' })
    @ApiResponse({ status: 404, description: 'Услуга не найдена' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.paintingServicesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить услугу покраски' })
    @ApiResponse({ status: 200, description: 'Услуга успешно обновлена' })
    @ApiResponse({ status: 404, description: 'Услуга не найдена' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePaintingServiceDto: Partial<CreatePaintingServiceDto>,
    ) {
        return this.paintingServicesService.update(id, updatePaintingServiceDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить услугу покраски' })
    @ApiResponse({ status: 200, description: 'Услуга успешно удалена' })
    @ApiResponse({ status: 404, description: 'Услуга не найдена' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.paintingServicesService.remove(id);
    }
} 