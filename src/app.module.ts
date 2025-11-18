import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './modules/patients/patients.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongoModule } from './@shared/database/mongo/mongo.module';
import { LoggerMiddleware } from './@shared/middlewares/LoggerMiddleware';
import { ClinicsModule } from './modules/clinics/clinics.module';

@Module({
  imports: [PatientsModule, AuthModule, ClinicsModule, MongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
