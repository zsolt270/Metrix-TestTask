import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateNomineeDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  @Matches(/^[A-Z].*/, {
    message: 'The movie title has to start with a capital letter!',
  })
  movieTitle?: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  releaseDate?: Date;

  @IsOptional()
  @IsBoolean()
  isWinner?: boolean;
}
