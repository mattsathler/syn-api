import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { GETPatientsDTO, PatientDTO } from './PatientsDTO';
import { RecordsService } from './records/records.service';
import { RecordsDTO } from './records/RecordsDTO';
import { _Employee } from '../../@shared/decorators/_Employee';
import { Employee } from '../types/Employee';
import { JwtAuthGuard } from '../../@shared/guards/JWTAuthGuard';

@Controller('patients')
export class PatientsController {
    constructor(private readonly patientsService: PatientsService, private readonly recordsService: RecordsService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async list(@Query() query: GETPatientsDTO) {
        return this.patientsService.findAll(query);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOne(@Param('id') id: string) {
        const patient = await this.patientsService.findOne(id);
        if (patient) {
            return patient;
        }
        throw new NotFoundException('Paciente não encontrado');
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPatient(@Body() body: PatientDTO) {
        return this.patientsService.create(body);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patch(@Param('id') id: string, @Body() body: PatientDTO) {
        return this.patientsService.patch(id, body);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/records')
    async createRecord(
        @Param('id') id: string,
        @Body() body: RecordsDTO,
        @_Employee() employee: Employee
    ) {
        return this.recordsService.create(id, body, employee);
    }
}
