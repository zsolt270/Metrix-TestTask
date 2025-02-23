import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'The title of the movie',
    example: 'The Godfather',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Matches(/^[A-Z].*/, {
    message: 'The movie title has to start with a capital letter!',
  })
  movieTitle: string;

  @ApiPropertyOptional({
    description: 'The director of the movie',
    example: 'Albert S. Ruddy',
  })
  @IsOptional()
  @IsString()
  director?: string;

  @ApiPropertyOptional({
    description: 'A short description about the movie',
    example:
      'The Godfather is set in the 1940s and takes place entirely within the world of the Corleones, a fictional New York Mafia family. It opens inside the dark office of the family patriarch, Don Vito Corleone (also known as the Godfather and played by Brando), on the wedding day of his daughter, Connie (Talia Shire)...',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The release date of the movie',
    example: '1972-03-24',
  })
  @IsNotEmpty()
  @IsDateString()
  releaseDate: Date;

  @ApiProperty({ description: 'Did the movie win an oscar?', example: true })
  @IsNotEmpty()
  @IsBoolean()
  isWinner: boolean;
}

export class CreateNomineeResponseDto {
  @ApiProperty({
    description: 'The title of the created movie',
    example: 'The Godfather',
  })
  movieTitle: string;

  @ApiPropertyOptional({
    description: 'The director of the movie',
    example: 'Albert S. Ruddy',
  })
  director?: string;

  @ApiPropertyOptional({
    description: 'A short description about the movie',
    example:
      'The Godfather is set in the 1940s and takes place entirely within the world of the Corleones, a fictional New York Mafia family. It opens inside the dark office of the family patriarch, Don Vito Corleone (also known as the Godfather and played by Brando), on the wedding day of his daughter, Connie (Talia Shire)...',
  })
  description?: string;

  @ApiProperty({
    description: 'The release date of the movie',
    example: '1972-03-24',
  })
  releaseDate: Date;

  @ApiProperty({ description: 'Did the movie win an oscar?', example: true })
  isWinner: boolean;
}

export class CreateNomineeBadRequestDto {
  @ApiProperty({
    description: 'The date when the error occured',
    example: '2025-02-23T21:23:58.009Z',
  })
  timestamp: Date;

  @ApiProperty({
    description: 'The path where the error occured',
    example: '/nominees?skip&limit=8&winners=&search=&sort=',
  })
  path: string;

  @ApiProperty({
    description: 'The method that caused the problem',
    example: 'POST',
  })
  method: string;

  @ApiProperty({
    description: 'Error status code',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error messages',
    example: 'isWinner must be a boolean value',
  })
  message: string[] | string;
}
