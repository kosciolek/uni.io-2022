import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from '../prisma.service';
import { AuthzModule } from '../authz/authz.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
  imports: [AuthzModule],
})
export class PostsModule {}
