import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Clinic extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    @Prop()
    cnpj?: string;

    @Prop()
    logo?: string;

    @Prop({ required: true })
    @Prop()
    address?: string;

    @Prop()
    phone?: string;

    @Prop()
    email?: string;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);