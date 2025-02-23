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

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode =
      exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
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
      `${request.body.method} ${request.url} `,
      JSON.stringify(errorResponse),
      'AllExceptionsFilter',
    );

    response.status(statusCode).json(errorResponse);
  }
}
