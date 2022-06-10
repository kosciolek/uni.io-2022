import { IsNumber, Length } from 'class-validator';

export class CreateReportDto {
  @Length(1, 600)
  reason: string;

  @IsNumber()
  postId: number;
}
