import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Nominee } from './nominee.schema';
import { Model } from 'mongoose';
import { CreateNomineeDto } from './dto/createNominee.dto';
import { UpdateNomineeDto } from './dto/updateNominee.dto';
import { GetNomineesDto } from './dto/getNominees.dto';

@Injectable()
export class NomineesService {
  constructor(
    @InjectModel(Nominee.name) private nomineeModel: Model<Nominee>,
  ) {}

  createNominee(createNomineeDto: CreateNomineeDto) {
    const newNominee = new this.nomineeModel(createNomineeDto);
    return newNominee.save();
  }

  async getNominees(getNomineesDto: GetNomineesDto) {
    const nominees = await this.nomineeModel
      .find()
      .skip(getNomineesDto.skip)
      .limit(getNomineesDto.limit);
    return nominees.map((nominee) => {
      return { movieTitle: nominee.movieTitle, isWinner: nominee.isWinner };
    });
  }

  // async getWinners() {
  //   const winners = await this.nomineeModel.find({ isWinner: true });
  //   return winners.map((winner) => {
  //     return { movieTitle: winner.movieTitle, isWinner: winner.isWinner };
  //   });
  // }

  async getNominee(id: string) {
    const foundNominee = await this.nomineeModel.findById(id);
    if (!foundNominee) throw new HttpException('Nominee not found!', 404);
    return {
      movieTitle: foundNominee.movieTitle,
      description: foundNominee.description,
      releaseDate: foundNominee.releaseDate,
      director: foundNominee.director,
    };
  }

  async updateNominee(id: string, updateNomineeDto: UpdateNomineeDto) {
    const updatedNominee = await this.nomineeModel.findByIdAndUpdate(
      id,
      updateNomineeDto,
      { new: true },
    );
    if (!updatedNominee) throw new HttpException('Nominee not found!', 404);
    return updatedNominee;
  }
}
