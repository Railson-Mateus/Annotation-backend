import { Module } from '@nestjs/common';
import { AnnotationsService } from './annotations.service';
import { AnnotationsController } from './annotations.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [AnnotationsController],
  providers: [AnnotationsService, PrismaService],
})
export class AnnotationsModule {}
