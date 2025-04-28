import { Injectable, NotFoundException } from "@nestjs/common";
import { Details } from "./details.entity";
import { CreateDetailDto } from "./dto/create-detail.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class DetailsService {
    constructor(
        @InjectRepository(Details)
        private detailsRepository: Repository<Details>,
    ) {}

    async findAll(): Promise<Details[]> {
        return this.detailsRepository.find();
    }

    async findOne(id: number): Promise<Details> {
        const detail = await this.detailsRepository.findOne({ where: { id } });
        if (!detail) {
            throw new NotFoundException(`Detail with ID ${id} not found`);
        }
        return detail;
    }

    async create(createDetailDto: CreateDetailDto): Promise<Details> {
        const detail = this.detailsRepository.create(createDetailDto);
        return this.detailsRepository.save(detail);
    }

    async remove(id: number): Promise<void> {
        const result = await this.detailsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Detail with ID ${id} not found`);
        }
    }
}
