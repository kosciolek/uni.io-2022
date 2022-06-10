import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from '../prisma.service';
import { AuthzModule } from '../authz/authz.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService],
  imports: [AuthzModule],
})
export class CommentsModule {}
