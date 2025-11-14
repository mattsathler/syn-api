import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Record } from 'src/schemas/Record';
import { RecordsDTO } from './RecordsDTO';

@Injectable()
export class RecordsService {
    constructor(@InjectModel(Record.name) private recordModel: Model<Record>) { }

    async create(id: string, data: RecordsDTO) {
        const count: number = await this.recordModel.countDocuments();
        const newRecord = new this.recordModel({
            ...data,
            patientId: id,
            author: {
                id: 1,
                name: 'Admin Synapse',
                email: 'adm@synapse.com',
                identification: '1',
                isMedic: true,
                mainPhone: '21993242349',
                position: 'Admin',
            },
            registration: String(count + 1),
        });

        return await newRecord.save();
    }
}
