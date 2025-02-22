import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNomineeDto } from './dto/createNominee.dto';
import { NomineesService } from './nominees.service';

@Controller('nominees')
export class NomineesController {
  constructor(private nomineeService: NomineesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createNominee(@Body() createNomineeDto: CreateNomineeDto) {
    console.log(createNomineeDto);
    return this.nomineeService.createNominee(createNomineeDto);
  }
}
