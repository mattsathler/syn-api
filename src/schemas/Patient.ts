import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// -------------------------------------
// Subschemas
// -------------------------------------

@Schema({ _id: false })
export class Address {
    @Prop() street?: string;
    @Prop() number?: string;
    @Prop() complement?: string;
    @Prop() neighborhood?: string;
    @Prop() city?: string;
    @Prop() state?: string;
    @Prop() postalCode?: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);


// -------------------------------------
// Main Patient schema
// -------------------------------------

@Schema({ timestamps: true })
export class Patient extends Document {
    // Personal Information
    @Prop({ required: true }) registration: string;
    @Prop({ required: true }) fullName: string;
    @Prop() socialName?: string;
    @Prop() birthDate: string;
    @Prop({ enum: ['Male', 'Female', 'Other'] }) gender?: string;
    @Prop() identification?: string;
    @Prop() rg?: string;
    @Prop({ required: true }) age: number;
    @Prop() image?: string;
    @Prop() totalRecords?: number;

    // Address
    @Prop({ type: AddressSchema, required: true })
    address: Address;

    // Contact
    @Prop() phone?: string;
    @Prop() secondaryPhone?: string;
    @Prop() cellphone?: string;
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
    @Prop() children?: string;
    @Prop() companion?: string;
    @Prop() spouse?: string;
    @Prop() notes?: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
