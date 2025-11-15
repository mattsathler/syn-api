import _ from 'dotenv';
import { BadRequestException, Body, Controller, Get, Header, Headers, Post, Query, UnauthorizedException } from '@nestjs/common';
import { AuthBody } from '../types/authHeaders';
import { AuthService } from './auth.service';
const jwt = require('jsonwebtoken');


@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) { }

    @Post()
    async login(@Body() body: AuthBody) {
        const { email, password } = body;

        if (!email || !password) {
            throw new BadRequestException('Email e senha são obrigatórios');
        }

        const validEmployee = await this.service.validateEmployee(email, password);

        if (!validEmployee) {
            throw new UnauthorizedException('Email ou senha inválidos');
        }

        const secret = process.env.JWT_SECRET;
        const token = jwt.sign({ employee: validEmployee }, secret, { expiresIn: '1h' });

        return { employee: validEmployee, token: token };
    }
}