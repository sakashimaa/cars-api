import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { DetailsService } from './details.service';
import { Details } from './details.entity';
import { CreateDetailDto } from './dto/create-detail.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('details')
export class DetailsController {
    constructor(private readonly detailsService: DetailsService) {}

    @Get()
    findAll(): Promise<Details[]> {
        return this.detailsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Details> {
        return this.detailsService.findOne(id);
    }

    @Post()
    create(@Body() createDetailDto: CreateDetailDto): Promise<Details> {
        return this.detailsService.create(createDetailDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.detailsService.remove(id);
    }
}