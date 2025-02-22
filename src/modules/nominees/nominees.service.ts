import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Nominee } from './nominee.schema';
import mongoose, { Model } from 'mongoose';
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

  async getNominee(id: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new HttpException('Nominee not found!', 404);

    const foundNominee = await this.nomineeModel.findById(id);
    if (!foundNominee) throw new HttpException('Nominee not found!', 404);
    return {
      movieTitle: foundNominee.movieTitle,
      description: foundNominee.description,
      releaseDate: foundNominee.releaseDate,
      director: foundNominee.director,
    };
  }
}
