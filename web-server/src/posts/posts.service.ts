import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto, UpdatePostDto } from './posts.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    authorId,
    authorNickname,
    category,
    description,
    shortDescription,
    title,
    type,
    address,
    email,
    finished,
    phone,
  }: CreatePostDto & { authorId: string; authorNickname: string }) {
    return await this.prismaService.post.create({
      data: {
        authorId,
        authorNickname,
        category,
        description,
        shortDescription,
        title,
        type,
        address,
        email,
        finished,
        phone,
      },
    });
  }

  async findAll({
    partialTitle,
    includeFinished,
    postType,
    verifiedOnly,
    authorPartial,
    categories,
  }: {
    partialTitle?: string;
    includeFinished?: boolean;
    postType?: string[];
    verifiedOnly?: boolean;
    authorPartial?: string;
    categories?: string[];
  }) {
    return await this.prismaService.post.findMany({
      where: {
        title: {
          contains: partialTitle,
        },
        finished: includeFinished && undefined,
        type: {
          in: postType,
        },
        verified: verifiedOnly || undefined,
        authorNickname: {
          contains: authorPartial,
        },
        category: {
          in: categories,
        },
      },
      orderBy: {
        creationDate: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.post.findFirst({
      where: {
        id,
      },
      include: {
        comments: {
          orderBy: {
            creationDate: 'desc',
          },
        },
      },
    });
  }

  async isOwnerOfPost(userId: string, postId: number) {
    const post = await this.prismaService.post.findFirst({
      where: {
        authorId: userId,
        id: postId,
      },
    });

    return Boolean(post);
  }

  async update(
    id: number,
    {
      category,
      description,
      shortDescription,
      title,
      type,
      address,
      email,
      finished,
      phone,
    }: UpdatePostDto,
  ) {
    return await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        category,
        description,
        shortDescription,
        title,
        type,
        address,
        email,
        finished,
        phone,
      },
    });
  }
}
