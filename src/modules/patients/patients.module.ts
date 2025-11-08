import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],
  imports: [MongooseModule.forFeature([{ name: 'Patient', schema: require('../../schemas/Patient').PatientSchema }])],
})
export class PatientsModule { }
