import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateNomineeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Matches(/^[A-Z].*/, {
    message: 'The movie title has to start with a capital letter!',
  })
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
