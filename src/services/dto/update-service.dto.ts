import { IsString, IsNumber, IsOptional, Min, Length, IsUrl } from 'class-validator';

export class UpdateServiceDto {
    @IsString()
    @Length(3, 255, { message: 'Название услуги должно содержать от 3 до 255 символов' })
    @IsOptional()
    name?: string;

    @IsString()
    @Length(10, 500, { message: 'Краткое описание должно содержать от 10 до 500 символов' })
    @IsOptional()
    shortDescription?: string;

    @IsString()
    @Length(50, 10000, { message: 'Подробное описание должно содержать не менее 50 символов' })
    @IsOptional()
    longDescription?: string;

    @IsNumber()
    @Min(0, { message: 'Стоимость услуги не может быть отрицательной' })
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    @IsUrl({}, { message: 'Некорректный формат URL изображения' })
    imagePath?: string;
} 