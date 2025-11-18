import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/@shared/guards/JWTAuthGuard';
import { ClinicsService } from './clinics.service';
import { Employee } from '../types/Employee';
import { _Employee } from 'src/@shared/decorators/_Employee';

@Controller('clinics')
export class ClinicsController {
    constructor(private readonly clinicsService: ClinicsService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getOne(@_Employee() employee: Employee) {
        const clinic = await this.clinicsService.findOne(employee.clinic?.id);
        if (clinic) {
            return clinic;
        }
        throw new NotFoundException(`Clínica ${employee.clinic?.id} não encontrada`);
    }
}
