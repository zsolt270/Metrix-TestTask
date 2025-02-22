import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateNomineeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  movieTitle: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDateString()
  releaseDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  isWinner: boolean;
}
