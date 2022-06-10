import { IsNumber, Length } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  postId: number;
  @Length(1, 1000)
  body: string;
}
