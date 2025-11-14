import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GETPatientsDTO, PatientDTO } from './PatientsDTO';
import { Patient } from '../../schemas/Patient';
import { Record } from 'src/schemas/Record';

@Injectable()
export class PatientsService {
    constructor(
        @InjectModel(Patient.name) private patientModel: Model<Patient>,
        @InjectModel(Record.name) private recordModel: Model<Record>

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
                .sort({ registration: 1 }),
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

    async findOne(id: string): Promise<Patient | null> {
        let user = await this.patientModel.findOne({ registration: id });
        if (user) {
            user.age = this.calculateAge(user.birthDate);
            let records = await this.recordModel
                .find({ patientId: user?.registration })
                .sort({ _id: -1 });
            user.records = records ?? [];
        }

        return user;
    }


    async create(data: PatientDTO) {
        const count: number = await this.patientModel.countDocuments();
        const newPatient = new this.patientModel({
            ...data,
            registration: String(count + 1),
        });

        return await newPatient.save();
    }

    async patch(id: string, data: PatientDTO) {
        return await this.patientModel.updateOne({ registration: id }, data);
    }

    private calculateAge(birthDate: string): number {
        const diff = Date.now() - new Date(birthDate).getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }
}
