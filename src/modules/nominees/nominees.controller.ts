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
import {
  CreateNomineeBadRequestDto,
  CreateNomineeDto,
  CreateNomineeResponseDto,
} from './dto/createNominee.dto';
import { NomineesService } from './nominees.service';
import {
  UpdateNomineeBadRequestDto,
  UpdateNomineeDto,
  UpdateNomineeResponseDto,
} from './dto/updateNominee.dto';
import {
  GetNomineeBadRequestDto,
  GetNomineeResponseDto,
  GetNomineesDto,
  GetNomineesResponseDto,
} from './dto/getNominees.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('nominees')
@Controller('nominees')
export class NomineesController {
  constructor(private nomineeService: NomineesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new nominee' })
  @ApiCreatedResponse({
    description: 'Nominee created',
    type: CreateNomineeResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad payload sent',
    type: CreateNomineeBadRequestDto,
  })
  @UsePipes(new ValidationPipe())
  createNominee(@Body() createNomineeDto: CreateNomineeDto) {
    return this.nomineeService.createNominee(createNomineeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all the nominees' })
  @ApiOkResponse({
    description: 'Got the nominees',
    type: [GetNomineesResponseDto],
  })
  @UsePipes(new ValidationPipe())
  getNominees(@Query() getNomineesDto: GetNomineesDto) {
    return this.nomineeService.getNominees(getNomineesDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a nominee by ID' })
  @ApiOkResponse({
    description: 'Got the specified nominee',
    type: GetNomineeResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid ID',
    type: GetNomineeBadRequestDto,
  })
  getNominee(@Param('id') id: string) {
    return this.nomineeService.getNominee(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a nominee' })
  @ApiOkResponse({
    description: 'Nominee modified',
    type: UpdateNomineeResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad payload sent',
    type: UpdateNomineeBadRequestDto,
  })
  @UsePipes(new ValidationPipe())
  updateNominee(
    @Param('id') id: string,
    @Body() updateNomineeDto: UpdateNomineeDto,
  ) {
    return this.nomineeService.updateNominee(id, updateNomineeDto);
  }
}
