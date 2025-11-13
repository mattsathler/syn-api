import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { GETPatientsDTO, POSTPatientsDTO } from './PatientsDTO';

@Controller('patients')
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) { }

    @Get()
    async list(@Query() query: GETPatientsDTO) {
        return this.patientsService.findAll(query);
    }

    @Post()
    async create(@Body() body: POSTPatientsDTO) {
        return this.patientsService.create(body);
    }
}
