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
    const searchPattern = new RegExp(getNomineesDto.search!, 'i');
    return await this.nomineeModel
      .find(
        getNomineesDto.winners === 'true'
          ? { movieTitle: searchPattern, isWinner: true }
          : { movieTitle: searchPattern },
        'movieTitle isWinner',
      )
      .skip(getNomineesDto.skip!)
      .limit(
        Number(getNomineesDto.limit) || Number(process.env.DEFAULT_LIST_SIZE),
      )
      .sort(
        ['movieTitle', 'releaseDate', 'isWinner'].includes(getNomineesDto.sort!)
          ? getNomineesDto.sort === 'movieTitle'
            ? { [getNomineesDto.sort]: 1 }
            : { [getNomineesDto.sort!]: -1 }
          : {},
      );
  }

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
