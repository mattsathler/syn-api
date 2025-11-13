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

        const validUser = await this.service.validateUser(email, password);

        if (!validUser) {
            throw new UnauthorizedException('Email ou senha inválidos');
        }

        const secret = process.env.JWT_SECRET;
        const token = jwt.sign({ sub: email }, secret, { expiresIn: '1h' });

        return { token: token };
    }
}