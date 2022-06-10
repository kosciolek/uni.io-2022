import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { AuthzModule } from './authz/authz.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [PostsModule, CommentsModule, AuthzModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
