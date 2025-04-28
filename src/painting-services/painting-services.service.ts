import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaintingServiceDto } from './dto/create-painting-service.dto';
import { PaintingService } from './entities/painting-service.entity';

@Injectable()
export class PaintingServicesService {
    constructor(
        @InjectRepository(PaintingService)
        private paintingServicesRepository: Repository<PaintingService>,
    ) {}

    async create(createPaintingServiceDto: CreatePaintingServiceDto): Promise<PaintingService> {
        const paintingService = this.paintingServicesRepository.create(createPaintingServiceDto);
        return await this.paintingServicesRepository.save(paintingService);
    }

    async findAll(): Promise<PaintingService[]> {
        return await this.paintingServicesRepository.find();
    }

    async findOne(id: number): Promise<PaintingService> {
        const paintingService = await this.paintingServicesRepository.findOne({ where: { id } });
        if (!paintingService) {
            throw new NotFoundException(`Услуга покраски с ID ${id} не найдена`);
        }
        return paintingService;
    }

    async update(id: number, updatePaintingServiceDto: Partial<CreatePaintingServiceDto>): Promise<PaintingService> {
        const paintingService = await this.findOne(id);
        Object.assign(paintingService, updatePaintingServiceDto);
        return await this.paintingServicesRepository.save(paintingService);
    }

    async remove(id: number): Promise<void> {
        const result = await this.paintingServicesRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Услуга покраски с ID ${id} не найдена`);
        }
    }
} 