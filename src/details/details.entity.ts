import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity('details')
export class Details {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text' })
    article: string;

    @Column({ type: 'text' })
    creatorCode: string;

    @Column({ type: 'text' })
    creator: string

    @Column({ type: 'text' })
    detailCategory: string;

    @Column({ nullable: false })
    imagePath: string;

    @Column({ nullable: false })
    price: number;

    @Column({ nullable: false })
    quantity: number;
}