import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Clinic } from "./Clinic";
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class Employee extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, lowercase: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({
        required: true,
        enum: ['admin', 'doctor', 'receptionist', 'assistant'],
        default: 'doctor',
    })
    role: 'admin' | 'doctor' | 'receptionist' | 'assistant';

    @Prop({ type: Types.ObjectId, ref: 'Clinic', required: true })
    clinic: Clinic | Types.ObjectId;

    @Prop({ default: true })
    isActive: boolean;

    @Prop()
    lastLogin?: Date;

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

EmployeeSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});