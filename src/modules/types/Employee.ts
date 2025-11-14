import { IsString, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class Employee {
  @IsString()
  id: string;

  @IsString()
  name: string;

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
