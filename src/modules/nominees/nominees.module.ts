import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Nominee, NomineeSchema } from './nominee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Nominee.name,
        schema: NomineeSchema,
      },
    ]),
  ],
})
export class NomineesModule {}
