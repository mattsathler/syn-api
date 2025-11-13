import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Clinic extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    cnpj?: string;

    @Prop({ required: true, unique: true })
    domain: string; // Exemplo: "clinica-aurora.app.com"

    @Prop()
    logo?: string;

    @Prop()
    address?: string;

    @Prop()
    phone?: string;

    @Prop({ default: true })
    isActive: boolean;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);