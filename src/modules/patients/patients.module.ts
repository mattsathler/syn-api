import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordsService } from './records/records.service';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService, RecordsService],
  imports: [MongooseModule.forFeature([
    { name: 'Patient', schema: require('../../schemas/Patient').PatientSchema },
    { name: 'Record', schema: require('../../schemas/Record').RecordSchema }])],
})
export class PatientsModule { }
