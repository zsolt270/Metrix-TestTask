import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Nominee } from './nominee.schema';
import { Model } from 'mongoose';
import { CreateNomineeDto } from './dto/createNominee.dto';

@Injectable()
export class NomineesService {
  constructor(
    @InjectModel(Nominee.name) private nomineeModel: Model<Nominee>,
  ) {}

  createNominee(createNomineeDto: CreateNomineeDto) {
    const newNominee = new this.nomineeModel(createNomineeDto);
    return newNominee.save();
  }
}
