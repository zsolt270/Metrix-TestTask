import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

@Injectable()
export class IdValidatorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) throw new HttpException('Invalid ID!', 400);
    next();
  }
}
