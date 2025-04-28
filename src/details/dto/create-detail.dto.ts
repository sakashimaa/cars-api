import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateDetailDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    article: string;

    @IsString()
    @IsOptional()
    creatorCode: string;

    @IsString()
    @IsOptional()
    creator: string;

    @IsString()
    @IsOptional()
    detailCategory: string;

    @IsString()
    @IsOptional()
    imagePath: string;

    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;
}