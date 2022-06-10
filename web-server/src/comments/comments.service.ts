import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCommentDto } from './comments.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    authorId,
    authorNickname,
    postId,
    body,
  }: CreateCommentDto & {
    authorId: string;
    authorNickname: string;
  }) {
    return await this.prismaService.comment.create({
      data: {
        authorId,
        authorNickname,
        body,
        postId,
      },
    });
  }
}
