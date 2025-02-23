/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoError } from 'mongodb';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException | MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.log(request.method);
    if (
      exception.constructor.name === 'MongoServerError' &&
      (exception as MongoError).code === 11000
    ) {
      Logger.error(
        `${request.body.method} ${request.url} `,
        JSON.stringify({
          timestamp: new Date().toISOString(),
          path: request.url,
          message: exception.message,
        }),
        'AllExceptionsFilter',
      );

      response.status(400).json({
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        statusCode: 400,
        message: 'A nominee with the given title already exists!',
      });
    }

    const statusCode =
      (exception as HttpException).getStatus() ||
      HttpStatus.INTERNAL_SERVER_ERROR;
    const message: string =
      exception['response']['message'] || exception.message;

    const errorResponse = {
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      statusCode,
      message,
    };

    Logger.error(
      `${request.method} ${request.url} `,
      JSON.stringify(errorResponse),
      'AllExceptionsFilter',
    );

    response.status(statusCode).json(errorResponse);
  }
}
