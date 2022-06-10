import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { IsBoolean, IsEmail, IsIn, IsOptional, Length } from 'class-validator';

export class CreatePostDto {
  @IsIn(['accommodation', 'food', 'misc'])
  category: 'accommodation' | 'food' | 'misc';

  @IsOptional()
  @Length(1, 20)
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @Length(1, 32)
  title: string;

  @Length(1, 60)
  @IsOptional()
  address?: string;

  @IsIn(['needs', 'offers'])
  type: 'needs' | 'offers';

  @IsOptional()
  @IsBoolean()
  finished?: boolean;

  @Length(1, 600)
  shortDescription: string;

  @Length(1, 30000)
  description: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
