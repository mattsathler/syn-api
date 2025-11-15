import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Employee } from '../../schemas/Employee';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Employee.name) private employees: Model<Employee>,
    ) { }

    public async validateEmployee(email: string, password: string): Promise<Employee | null> {
        const employee = await this.employees.findOne({ email });
        if (!employee) return null;

        const isValid = await bcrypt.compare(password, employee.password);
        if (!isValid) return null;

        const { password: _, ...result } = employee.toObject();
        return result as unknown as Employee;
    }
}
