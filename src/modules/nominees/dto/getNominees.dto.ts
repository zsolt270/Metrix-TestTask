import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Types } from 'mongoose';

export class GetNomineesDto {
  @ApiPropertyOptional({
    description: 'The amount of nominees to skip',
    example: 3,
  })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Min(0)
  @IsOptional()
  skip?: number;

  @ApiPropertyOptional({
    description: 'The amount of nominees to list',
    example: 3,
  })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Min(0)
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ description: 'Show only the winners', example: false })
  @IsOptional()
  winners?: string;

  @ApiPropertyOptional({
    description: 'Search string for a movie title',
    example: 'father',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    description: 'Sort by movieTitle / releaseDate / isWinner',
    example: 'movieTitle',
  })
  @IsString()
  @IsOptional()
  sort?: string;
}

export class GetNomineesResponseDto {
  @ApiProperty({ description: 'Id of the nominee' })
  _id: Types.ObjectId;

  @ApiProperty({ description: 'Title of the movie', example: 'The Godfather' })
  movieTitle: string;

  @ApiProperty({ description: 'Did the movie win an oscar?', example: true })
  isWinner: boolean;
}

export class GetNomineeResponseDto {
  @ApiProperty({
    description: 'The title of the movie',
    example: 'The Godfather',
  })
  movieTitle: string;

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

  @ApiPropertyOptional({
    description: 'The director of the movie',
    example: 'Albert S. Ruddy',
  })
  director?: string;
}

export class GetNomineeBadRequestDto {
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
    example: 'Invalid ID',
  })
  message: string;
}
