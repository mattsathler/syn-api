import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { GETPatientsDTO, PatientDTO } from './PatientsDTO';

@Controller('patients')
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) { }

    @Get()
    async list(@Query() query: GETPatientsDTO) {
        return this.patientsService.findAll(query);
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        const patient = await this.patientsService.findOne(id);
        if (patient) {
            return patient;
        }
        throw new NotFoundException('Paciente não encontrado');
    }

    @Post()
    async create(@Body() body: PatientDTO) {
        return this.patientsService.create(body);
    }

    @Patch(':id')
    async patch(@Param('id') id: string, @Body() body: PatientDTO) {
        return this.patientsService.patch(id, body);
    }
}
