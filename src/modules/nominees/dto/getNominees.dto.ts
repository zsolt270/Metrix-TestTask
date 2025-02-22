import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class GetNomineesDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  skip: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number;
}
