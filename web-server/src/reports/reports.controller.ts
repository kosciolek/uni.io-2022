import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from '../utils/UserIdDecorator';
import { CreateReportDto } from './reports.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(AuthGuard('jwt'))
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async create(
    @UserId() reporterId: string,
    @Body() { postId, reason }: CreateReportDto,
  ) {
    return await this.reportsService.create({ postId, reason, reporterId });
  }

  @Get()
  async findAll() {
    return await this.reportsService.findAll();
  }
}
