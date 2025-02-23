import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class GetNomineesDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Min(0)
  @IsOptional()
  skip: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Min(0)
  @IsOptional()
  limit: number;

  @IsOptional()
  winners: string;
}
