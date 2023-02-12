import { Module } from '@nestjs/common';
import { AnnotationsService } from './annotations.service';
import { AnnotationsController } from './annotations.controller';
import { PrismaService } from '../../database/PrismaService';
import { MongooseModule } from '@nestjs/mongoose';
import { Annotation, AnnotationSchema } from './dto/annotation.schema';
import { Neo4jService } from '../neo4j/neo4j.service';
import { Neo4jModule } from '../neo4j/neo4j.module';

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
export class AnnotationsModule { }
