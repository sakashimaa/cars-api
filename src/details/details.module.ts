import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DetailsController } from "./details.controller";
import { DetailsService } from "./details.service";
import { Details } from "./details.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Details])],
    controllers: [DetailsController],
    providers: [DetailsService],
    exports: [DetailsService],
})
export class DetailsModule {}
