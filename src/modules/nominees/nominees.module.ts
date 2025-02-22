import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Nominee, NomineeSchema } from './nominee.schema';
import { NomineesService } from './nominees.service';
import { NomineesController } from './nominees.controller';
import { IdValidatorMiddleware } from 'src/common/middleware/idValidator.middleware';

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
export class NomineesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdValidatorMiddleware).forRoutes({
      path: 'nominees/:id',
      method: RequestMethod.PATCH,
    });
    consumer.apply(IdValidatorMiddleware).forRoutes({
      path: 'nominees/:id',
      method: RequestMethod.GET,
    });
  }
}
