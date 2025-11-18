import { Clinic } from '../../schemas/Clinic';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClinicsService {
    constructor(
        @InjectModel(Clinic.name) private clinicModel: Model<Clinic>
    ) { }

    async findOne(id: string): Promise<Clinic | null> {
        let clinic = await this.clinicModel.findOne({ registration: id });
        return clinic;
    }
}
