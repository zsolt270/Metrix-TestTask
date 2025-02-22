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

  async getNominees() {
    const nominees = await this.nomineeModel.find();
    return nominees.map((nominee) => {
      return { movieTitle: nominee.movieTitle, isWinner: nominee.isWinner };
    });
  }

  async getWinners() {
    const winners = await this.nomineeModel.find({ isWinner: true });
    return winners.map((winner) => {
      return { movieTitle: winner.movieTitle, isWinner: winner.isWinner };
    });
  }
}
