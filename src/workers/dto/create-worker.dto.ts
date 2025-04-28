import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateWorkerDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  shortDescription: string;

  @IsString()
  @IsOptional()
  fullDescription: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsString()
  @IsOptional()
  imagePath: string;
}
