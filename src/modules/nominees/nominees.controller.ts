import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNomineeDto } from './dto/createNominee.dto';
import { NomineesService } from './nominees.service';
import { UpdateNomineeDto } from './dto/updateNominee.dto';

@Controller('nominees')
export class NomineesController {
  constructor(private nomineeService: NomineesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createNominee(@Body() createNomineeDto: CreateNomineeDto) {
    console.log(createNomineeDto);
    return this.nomineeService.createNominee(createNomineeDto);
  }

  @Get()
  getNominees() {
    return this.nomineeService.getNominees();
  }

  @Get('winners')
  getWinners() {
    return this.nomineeService.getWinners();
  }

  @Get(':id')
  getNominee(@Param('id') id: string) {
    return this.nomineeService.getNominee(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateNominee(
    @Param('id') id: string,
    @Body() updateNomineeDto: UpdateNomineeDto,
  ) {
    return this.nomineeService.updateNominee(id, updateNomineeDto);
  }
}
