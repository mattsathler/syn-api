import { IsString, IsBoolean, IsOptional, IsDateString, IsObject } from 'class-validator';
import { Types } from 'mongoose';
import { Clinic } from 'src/schemas/Clinic';

export class Employee {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsObject()
  clinic: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsString()
  email: string;

  @IsString()
  identification: string;

  @IsString()
  position: string;

  @IsBoolean()
  isMedic: boolean;

  @IsString()
  mainPhone: string;

  @IsOptional()
  @IsString()
  secondaryPhone?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;
}
