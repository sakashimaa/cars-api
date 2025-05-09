import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  async findAll(): Promise<Car[]> {
    return this.carsRepository.find();
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.carsRepository.findOne({ where: { id } });
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return car;
  }

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = this.carsRepository.create(createCarDto);
    return this.carsRepository.save(car);
  }

  async remove(id: number): Promise<void> {
    const result = await this.carsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.findOne(id);

    // Обновляем только переданные поля
    Object.assign(car, updateCarDto);

    return this.carsRepository.save(car);
  }
}
