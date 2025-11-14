import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Employee } from 'src/modules/types/Employee';

// -----------------------------------------------------
// Subschemas opcionais
// -----------------------------------------------------

@Schema({ _id: false })
export class Attachment {
    @Prop()
    name: string;

    @Prop()
    url: string;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);

@Schema({ _id: false })
export class Image {
    @Prop()
    url: string;

    @Prop()
    description?: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);

// -----------------------------------------------------
// Record Schema Principal
// -----------------------------------------------------

@Schema()
export class Record extends Document {
    @Prop({ required: true })
    patientId: string;

    @Prop({ required: true })
    date: string;

    @Prop({ required: true })
    time: string;

    @Prop({ type: Object, required: true })
    author: Employee;

    @Prop({ required: true })
    content: string;

    @Prop({ type: [AttachmentSchema], default: [] })
    attachments?: Attachment[];

    @Prop({ type: ImageSchema })
    images?: Image;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
