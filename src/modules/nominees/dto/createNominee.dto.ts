import {
  IsBoolean,
  IsDate,
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
  @IsDate()
  releaseDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  isWinner: boolean;
}
