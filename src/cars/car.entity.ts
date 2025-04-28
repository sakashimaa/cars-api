import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  shortDescription: string;

  @Column({ nullable: true })
  fullDescription: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  imagePath: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 