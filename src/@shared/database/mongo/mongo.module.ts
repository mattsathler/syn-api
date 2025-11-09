import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
    imports: [MongooseModule.forRoot(process.env.MONGO_URI!, {
        dbName: process.env.MONGO_DB_NAME!
    })]
})
export class MongoModule { }
