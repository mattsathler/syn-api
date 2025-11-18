import { Clinic } from '../../schemas/Clinic';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClinicsDTO } from './clinicsDTO';

@Injectable()
export class ClinicsService {
    constructor(
        @InjectModel(Clinic.name) private clinicModel: Model<Clinic>
    ) { }

    async findOne(id: string): Promise<Clinic | null> {
        const clinic = await this.clinicModel.findOne({ id: id });
        return clinic;
    }

    async update(id: string, payload: ClinicsDTO): Promise<Clinic | null> {
        const clinic = await this.clinicModel.findOneAndUpdate({ id: id }, payload, { returnDocument: 'after' });
        return clinic
    }
}
