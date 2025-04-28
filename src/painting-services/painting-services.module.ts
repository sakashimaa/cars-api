import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaintingServicesService } from './painting-services.service';
import { PaintingServicesController } from './painting-services.controller';
import { PaintingService } from './entities/painting-service.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PaintingService])],
    controllers: [PaintingServicesController],
    providers: [PaintingServicesService],
    exports: [PaintingServicesService],
})
export class PaintingServicesModule {} 