import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNomineeDto } from './dto/createNominee.dto';
import { NomineesService } from './nominees.service';
import { UpdateNomineeDto } from './dto/updateNominee.dto';
import { GetNomineesDto } from './dto/getNominees.dto';

@Controller('nominees')
export class NomineesController {
  constructor(private nomineeService: NomineesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createNominee(@Body() createNomineeDto: CreateNomineeDto) {
    return this.nomineeService.createNominee(createNomineeDto);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  getNominees(@Query() getNomineesDto: GetNomineesDto) {
    return this.nomineeService.getNominees(getNomineesDto);
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
