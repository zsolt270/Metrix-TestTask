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
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/common/filters/allExceptions.filter';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';

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
  providers: [
    NomineesService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
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
