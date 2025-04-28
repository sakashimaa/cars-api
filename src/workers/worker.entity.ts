import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity';

@Entity('workers') 
export class Worker {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ nullable: true })
    shortDescription: string;

    @Column({ nullable: true })
    fullDescription: string;

    @Column({ nullable: true })
    imagePath: string;

    @Column({ nullable: true })
    workTime: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    position: string;

    @OneToMany(() => Review, (review) => review.worker, { cascade: true })
    reviews: Review[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}