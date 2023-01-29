import { Module } from '@nestjs/common';
import { AnnotationsService } from './annotations.service';
import { AnnotationsController } from './annotations.controller';
import { PrismaService } from '../../database/PrismaService';
import { MongooseModule } from '@nestjs/mongoose';
import { Annotation, AnnotationSchema } from './dto/annotation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Annotation.name, schema: AnnotationSchema },
    ]),
  ],
  controllers: [AnnotationsController],
  providers: [AnnotationsService, PrismaService],
})
export class AnnotationsModule {}
