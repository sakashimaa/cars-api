import { IsString, IsNumber, IsOptional, Min, Length, IsUrl, IsArray, IsEnum, Max } from 'class-validator';

export enum PaintingType {
    FULL_BODY = 'FULL_BODY',
    PARTIAL = 'PARTIAL',
    REPAIR = 'REPAIR',
    CUSTOM = 'CUSTOM'
}

export class CreatePaintingServiceDto {
    @IsString()
    @Length(3, 255, { message: 'Название услуги должно содержать от 3 до 255 символов' })
    name: string;

    @IsString()
    @Length(10, 500, { message: 'Краткое описание должно содержать от 10 до 500 символов' })
    shortDescription: string;

    @IsString()
    @Length(50, 10000, { message: 'Подробное описание должно содержать не менее 50 символов' })
    longDescription: string;

    @IsNumber()
    @Min(0, { message: 'Стоимость услуги не может быть отрицательной' })
    price: number;

    @IsEnum(PaintingType)
    type: PaintingType;

    @IsNumber()
    @Min(1)
    @Max(30, { message: 'Максимальный срок выполнения - 30 дней' })
    estimatedDays: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    reviews?: string[];

    @IsArray()
    @IsUrl({}, { each: true, message: 'Некорректный формат URL изображения' })
    @IsOptional()
    beforeAfterImages?: string[];

    @IsString()
    @IsOptional()
    @Length(0, 1000, { message: 'Дополнительные требования не должны превышать 1000 символов' })
    additionalRequirements?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    warrantyMonths?: number;
} 