import { Injectable, NotFoundException } from "@nestjs/common";
import { Service } from "./service.entity";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service)
        private servicesRepository: Repository<Service>,
    ) {}

    async findAll(): Promise<Service[]> {
        return this.servicesRepository.find();
    }

    async findOne(id: number): Promise<Service> {
        const service = await this.servicesRepository.findOne({ where: { id } });
        if (!service) {
            throw new NotFoundException(`Услуга с ID ${id} не найдена`);
        }
        return service;
    }

    async create(createServiceDto: CreateServiceDto): Promise<Service> {
        const service = this.servicesRepository.create(createServiceDto);
        return this.servicesRepository.save(service);
    }

    async update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service> {
        const service = await this.findOne(id);
        
        // Обновляем только переданные поля
        Object.assign(service, updateServiceDto);
        
        return this.servicesRepository.save(service);
    }

    async remove(id: number): Promise<void> {
        const result = await this.servicesRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Услуга с ID ${id} не найдена`);
        }
    }

    // Дополнительный метод для поиска услуг по названию
    async findByName(name: string): Promise<Service[]> {
        return this.servicesRepository
            .createQueryBuilder('service')
            .where('LOWER(service.name) LIKE LOWER(:name)', { name: `%${name}%` })
            .getMany();
    }

    // Метод для получения услуг в ценовом диапазоне
    async findByPriceRange(minPrice: number, maxPrice: number): Promise<Service[]> {
        return this.servicesRepository
            .createQueryBuilder('service')
            .where('service.price >= :minPrice', { minPrice })
            .andWhere('service.price <= :maxPrice', { maxPrice })
            .orderBy('service.price', 'ASC')
            .getMany();
    }
} 