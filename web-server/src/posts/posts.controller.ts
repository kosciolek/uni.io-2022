import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../authz/user.service';
import { UserId } from '../utils/UserIdDecorator';
import { CreatePostDto, UpdatePostDto } from './posts.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @UserId() userId: string,
    @Body()
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
    }: CreatePostDto,
  ) {
    const userNickname = await this.userService.getUserName(userId);

    return await this.postsService.create({
      category,
      description,
      shortDescription,
      title,
      type,
      address,
      email,
      finished,
      phone,
      authorId: userId,
      authorNickname: userNickname,
    });
  }

  @Get()
  async findAll(
    @Query()
    {
      title,
      includeFinished,
      postType,
      verifiedOnly,
      authorPartial,
      categories,
    }: Record<string, string | undefined>,
  ) {
    return await this.postsService.findAll({
      partialTitle: title,
      includeFinished: includeFinished === 'true',
      verifiedOnly: verifiedOnly === 'true',
      postType: postType?.split(','),
      authorPartial,
      categories: categories?.split(','),
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postsService.findOne(Number(id));
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @UserId() userId: string,
    @Param('id') id: string,
    @Body()
    {
      address,
      category,
      description,
      email,
      finished,
      phone,
      shortDescription,
      title,
      type,
    }: UpdatePostDto,
  ) {
    const isOwner = await this.postsService.isOwnerOfPost(userId, Number(id));
    if (!isOwner) throw new UnauthorizedException();

    return await this.postsService.update(Number(id), {
      address,
      category,
      description,
      email,
      finished,
      phone,
      shortDescription,
      title,
      type,
    });
  }
}
