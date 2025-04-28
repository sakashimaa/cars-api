import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity('services')
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 500 })
    shortDescription: string;

    @Column({ type: 'text' })
    longDescription: string;

    @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ nullable: true })
    imagePath: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}