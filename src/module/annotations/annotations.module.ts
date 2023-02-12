import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaService } from '../../database/PrismaService';
import { Neo4jModule } from '../neo4j/neo4j.module';
import { Neo4jService } from '../neo4j/neo4j.service';
import { AnnotationsController } from './annotations.controller';
import { AnnotationsService } from './annotations.service';
import { Annotation, AnnotationSchema } from './dto/annotation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Annotation.name, schema: AnnotationSchema },
    ]),
    Neo4jModule,
  ],
  controllers: [AnnotationsController],
  providers: [AnnotationsService, PrismaService, Neo4jService],
})
export class AnnotationsModule {}
