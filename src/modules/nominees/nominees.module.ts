import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Nominee, NomineeSchema } from './nominee.schema';
import { NomineesService } from './nominees.service';
import { NomineesController } from './nominees.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Nominee.name,
        schema: NomineeSchema,
      },
    ]),
  ],
  controllers: [NomineesController],
  providers: [NomineesService],
})
export class NomineesModule {}
