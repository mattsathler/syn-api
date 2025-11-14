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
    postalCode: string;

    @IsString()
    complement?: string;

    @IsString()
    neighborhood?: string;
}

export class PatientDTO {
    // Personal Information
    @IsOptional()
    @IsString()
    registration?: string;

    @IsString()
    fullName: string;

    @IsOptional()
    @IsString()
    socialName?: string;

    @IsDateString()
    birthDate: string;

    @IsOptional()
    @IsEnum(['Male', 'Female', 'Other'])
    gender?: string;

    @IsString()
    identification: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsNumber()
    totalRecords?: number;

    // Address
    @ValidateNested()
    @Type(() => AddressDto)
    address?: AddressDto;

    // Contact
    @IsString()
    mainPhone: string;

    @IsOptional()
    @IsString()
    secondaryPhone?: string;

    @IsString()
    mainCellphone: string;

    @IsOptional()
    @IsString()
    secondaryCellphone?: string;

    @IsOptional()
    @IsString()
    email?: string;

    // Insurance
    @IsOptional()
    @IsString()
    insuranceType?: string;

    @IsOptional()
    @IsString()
    insuranceCode?: string;

    @IsOptional()
    @IsString()
    cnsNumber?: string;

    @IsOptional()
    @IsString()
    medicalRecordNumber?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @IsOptional()
    @IsString()
    registrationNumber?: string;

    // Additional Information
    @IsOptional()
    @IsString()
    company?: string;

    @IsOptional()
    @IsString()
    reference?: string;

    @IsOptional()
    @IsString()
    referredBy?: string;

    @IsOptional()
    @IsString()
    maritalStatus?: string;

    @IsOptional()
    @IsString()
    profession?: string;

    @IsOptional()
    @IsString()
    educationLevel?: string;

    @IsOptional()
    @IsString()
    fatherName?: string;

    @IsOptional()
    @IsString()
    motherName?: string;

    @IsOptional()
    @IsNumber()
    children?: number;

    @IsOptional()
    @IsString()
    companion?: string;

    @IsOptional()
    @IsString()
    spouse?: string;

    @IsOptional()
    @IsString()
    notes?: string;
}
