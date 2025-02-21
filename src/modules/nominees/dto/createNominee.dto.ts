export class CreateNomineeDto {
  movieTitle: string;
  director?: string;
  description?: string;
  releaseDate: Date;
  isWinner: boolean;
}
