import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PaintingType } from '../dto/create-painting-service.dto';

@Entity('painting_services')
export class PaintingService {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    shortDescription: string;

    @Column('text')
    longDescription: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({
        type: 'enum',
        enum: PaintingType,
        default: PaintingType.CUSTOM
    })
    type: PaintingType;

    @Column()
    estimatedDays: number;

    @Column('simple-array', { nullable: true })
    reviews: string[];

    @Column('simple-array', { nullable: true })
    beforeAfterImages: string[];

    @Column({ nullable: true })
    additionalRequirements: string;

    @Column({ nullable: true })
    warrantyMonths: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 