import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateReportDto } from './reports.dto';

@Injectable()
export class ReportsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    postId,
    reason,
    reporterId,
  }: CreateReportDto & { reporterId: string }) {
    return await this.prismaService.postReport.create({
      data: {
        reason,
        postId,
        reporterId,
      },
    });
  }

  async findAll() {
    return await this.prismaService.postReport.findMany();
  }
}
