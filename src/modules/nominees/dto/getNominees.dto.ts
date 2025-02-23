import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class GetNomineesDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  @IsOptional()
  skip: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  @IsOptional()
  limit: number;
}
