import {
    IsInt,
    IsOptional,
    Min,
    IsString,
    IsDateString,
    ValidateNested,
    IsArray,
    IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Employee } from '../../types/Employee';

export class GETRecordsDTO {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;

    @IsOptional()
    @IsString()
    search?: string;
}

export class Attachment {
    @IsString()
    id: string;

    @IsString()
    title: string;

    @IsString()
    url: string;
}

export class Image {
    @IsString()
    url: string;
}

export class RecordsDTO {
    @IsDateString()
    date: string;    
    
    @IsString()
    time: string;

    @IsString()
    content: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Attachment)
    attachments?: Attachment[];

    @IsOptional()
    @ValidateNested()
    @Type(() => Image)
    images?: Image;
}
