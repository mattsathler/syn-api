// src/patients/dto/paginate-patient.dto.ts
import { IsInt, IsOptional, Min, IsString, IsDateString, IsEnum, IsNumber, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class GETPatientsDTO {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;

    @IsOptional()
    @IsString()
    search?: string;
}

class AddressDto {
    @IsString()
    street: string;

    @IsString()
    number: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    zipCode: string;

    @IsOptional()
    @IsString()
    complement?: string;
}

export class POSTPatientsDTO {
    @IsString()
    fullName: string;

    @IsString()
    registration: string;

    @IsOptional()
    @IsString()
    socialName?: string;

    @IsOptional()
    @IsDateString()
    birthDate?: string;

    @IsOptional()
    @IsEnum(['Male', 'Female'])
    gender?: string;

    @IsOptional()
    @IsString()
    identification?: string;

    @IsOptional()
    @IsString()
    registrationNumber?: string;

    @IsNumber()
    age: number;

    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;

    @IsOptional()
    @IsString()
    mainPhone?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];
}
