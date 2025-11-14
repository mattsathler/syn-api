import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// -------------------------------------
// Subschemas
// -------------------------------------

@Schema({ _id: false })
export class Address {
    @Prop() postalCode: string;
    @Prop() state: string;
    @Prop() city: string;
    @Prop() neighborhood: string;
    @Prop() street: string;
    @Prop() number: string;
    @Prop() complement: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);


// -------------------------------------
// Main Patient schema
// -------------------------------------

@Schema({ timestamps: true })
export class Patient extends Document {
    // Personal Information
    @Prop() registration: string;
    @Prop({ required: true }) fullName: string;
    @Prop() socialName?: string;
    @Prop({ required: true }) birthDate: string;
    @Prop({ enum: ['Male', 'Female', 'Other'] }) gender?: string;
    @Prop({ required: true }) identification?: string;
    @Prop() age?: number;
    @Prop() image?: string;
    @Prop() totalRecords?: number;

    // Address
    @Prop({ type: AddressSchema })
    address?: Address;

    // Contact
    @Prop({ required: true }) mainPhone: string;
    @Prop() secondaryPhone?: string;
    @Prop({ required: true }) mainCellphone: string;
    @Prop() secondaryCellphone?: string;
    @Prop() email?: string;

    // Insurance
    @Prop() insuranceType?: string;
    @Prop() insuranceCode?: string;
    @Prop() cnsNumber?: string;
    @Prop() medicalRecordNumber?: string;
    @Prop({ type: [String], default: [] }) tags?: string[];
    @Prop() registrationNumber?: string;

    // Additional Information
    @Prop() company?: string;
    @Prop() reference?: string;
    @Prop() referredBy?: string;
    @Prop() maritalStatus?: string;
    @Prop() profession?: string;
    @Prop() educationLevel?: string;
    @Prop() fatherName?: string;
    @Prop() motherName?: string;
    @Prop() children?: number;
    @Prop() companion?: string;
    @Prop() spouse?: string;
    @Prop() notes?: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
