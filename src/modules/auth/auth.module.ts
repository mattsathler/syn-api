import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [MongooseModule.forFeature([{ name: 'Employee', schema: require('../../schemas/Employee').EmployeeSchema }])],
})
export class AuthModule { }