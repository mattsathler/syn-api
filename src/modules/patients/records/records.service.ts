import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Record } from '../../../schemas/Record';
import { RecordsDTO } from './RecordsDTO';
import { Employee } from 'src/modules/types/Employee';

@Injectable()
export class RecordsService {
    constructor(@InjectModel(Record.name) private recordModel: Model<Record>) { }

    async create(id: string, data: RecordsDTO, employee: Employee) {
        const count: number = await this.recordModel.countDocuments();
        const newRecord = new this.recordModel({
            ...data,
            patientId: id,
            author: employee,
            registration: String(count + 1),
        });

        return await newRecord.save();
    }
}
