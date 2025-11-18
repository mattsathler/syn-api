import { Module } from '@nestjs/common';
import { ClinicsController } from './clinics.controller';
import { ClinicsService } from './clinics.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    controllers: [ClinicsController],
    providers: [ClinicsService],
    imports: [MongooseModule.forFeature([{ name: 'Clinic', schema: require('../../schemas/Clinic').ClinicSchema }])],
})
export class ClinicsModule { }