import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Nominee {
  @Prop({ unique: true, required: true })
  movieTitle: string;

  @Prop({ required: false })
  director?: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  releaseDate: Date;

  @Prop({ required: true })
  isWinner: boolean;
}

export const NomineeSchema = SchemaFactory.createForClass(Nominee);
