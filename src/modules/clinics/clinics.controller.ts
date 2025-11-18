import { Body, Controller, Get, NotFoundException, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../@shared/guards/JWTAuthGuard';
import { ClinicsService } from './clinics.service';
import { Employee } from '../types/Employee';
import { _Employee } from '../../@shared/decorators/_Employee';
import { ClinicsDTO } from './clinicsDTO';

@Controller('clinics')
export class ClinicsController {
    constructor(private readonly clinicsService: ClinicsService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getOne(@_Employee() employee: Employee) {
        const clinic = await this.clinicsService.findOne(employee.clinic);
        if (clinic) {
            return clinic;
        }
        throw new NotFoundException(`Clínica ${employee.clinic} não encontrada`);
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    async update(@_Employee() employee: Employee, @Body() body: ClinicsDTO) {
        const clinic = await this.clinicsService.update(employee.clinic, body);
        if (clinic) {
            return clinic;
        }
        throw new NotFoundException(`Clínica ${employee.clinic} não encontrada`);
    }
}
