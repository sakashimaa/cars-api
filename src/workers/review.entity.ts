import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Worker } from './worker.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  shortDescription: string;

  @Column({ type: 'text' })
  fullDescription: string;

  @Column({ type: 'float' })
  rating: number;

  @ManyToOne(() => Worker, (worker) => worker.reviews, { onDelete: 'CASCADE' })
  worker: Worker;
}