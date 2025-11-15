import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        const authHeader = request.headers['authorization'];
        if (!authHeader) throw new UnauthorizedException('Missing Authorization header');

        const token = authHeader.replace('Bearer ', '');

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            request.employee = decoded;

            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
