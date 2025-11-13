import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GETPatientsDTO, POSTPatientsDTO } from './PatientsDTO';
import { Patient } from '../../schemas/Patient';

@Injectable()
export class PatientsService {
    constructor(
        @InjectModel(Patient.name) private patientModel: Model<Patient>,
    ) { }

    async findAll(query: GETPatientsDTO): Promise<any> {
        const { page = 1, limit = 10, search } = query;
        const skip = (page - 1) * limit;

        const filter = search
            ? {
                $or: [
                    { fullName: { $regex: search, $options: 'i' } },
                    { registration: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { cellphone: { $regex: search, $options: 'i' } },
                    { secondaryCellphone: { $regex: search, $options: 'i' } },
                    { phone: { $regex: search, $options: 'i' } },
                    { secondaryPhone: { $regex: search, $options: 'i' } },
                ],
            }
            : {};

        let [data, total] = await Promise.all([
            this.patientModel
                .find(filter)
                .skip(skip)
                .limit(limit)
                .sort({ fullName: 1 }),
            this.patientModel.countDocuments(filter),
        ]);

        const now = new Date();
        const patients = data.map((patient) => {
            patient.age = this.calculateAge(patient.birthDate);
            return patient['_doc'];
        });

        return {
            total,
            data: patients,
        };
    }


    async create(data: POSTPatientsDTO) {
        const newPatient = new this.patientModel({
            ...data,
        });

        return await newPatient.save();
    }

    private calculateAge(birthDate: string): number {
        const diff = Date.now() - new Date(birthDate).getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }
}
