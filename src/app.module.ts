import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NomineesModule } from './modules/nominees/nominees.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING!),
    NomineesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
