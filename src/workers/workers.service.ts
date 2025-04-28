import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from './worker.entity';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { Review } from './review.entity';

@Injectable()
export class WorkersService {
    constructor(
        @InjectRepository(Worker)
        private workersRepository: Repository<Worker>,

        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
    ) {}
    
    async findAll(): Promise<Worker[]> {
        return this.workersRepository.find();
    }
    
    async findOne(id: number): Promise<Worker> {
        const worker = await this.workersRepository.findOne({ where: { id } });
        if (!worker) {
        throw new NotFoundException(`Worker with ID ${id} not found`);
        }
        return worker;
    }

    async create(createWorkerDto: CreateWorkerDto): Promise<Worker> {
        const worker = this.workersRepository.create(createWorkerDto);
        return this.workersRepository.save(worker);
    }

    async remove(id: number): Promise<void> {
        const result = await this.workersRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Worker with ID ${id} not found`);
        }
    }

    async addReview(workerId: number, reviewData: Partial<Review>): Promise<Review> {
        const worker = await this.workersRepository.findOne({ where: { id: workerId } });
        if (!worker) {
            throw new Error('Worker not found');
        }

        const review = this.reviewRepository.create({ ...reviewData, worker });
        return this.reviewRepository.save(review);
    }

    async getReviews(workerId: number): Promise<Review[]> {
        return this.reviewRepository.find({ where: { worker: { id: workerId } } });
    }
}