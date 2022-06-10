import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../authz/user.service';
import { UserId } from '../utils/UserIdDecorator';
import { CreateCommentDto } from './comments.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @UserId() userId: string,
    @Body() { body, postId }: CreateCommentDto,
  ) {
    const userNickname = await this.userService.getUserName(userId);

    return await this.commentsService.create({
      body,
      postId,
      authorId: userId,
      authorNickname: userNickname,
    });
  }
}
