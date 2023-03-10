import { Injectable } from '@nestjs/common';
import { CreateAnnotationDto } from './dto/create-annotation.dto';
import { PrismaService } from '../../database/PrismaService';
import { Annotation, AnnotationDocument } from './dto/annotation.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/entities/user.entity';
import { Neo4jService } from '../neo4j/neo4j.service';

export interface ISearch {
  text: string;
}

@Injectable()
export class AnnotationsService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Annotation.name)
    private annotationModel: Model<AnnotationDocument>,
    private neo4jService: Neo4jService,
  ) { }

  async create(createAnnotationDto: CreateAnnotationDto, user: User) {
    const data = {
      ...createAnnotationDto,
      userId: user.id,
    };

    const createAnnotation = await this.prisma.annotation.create({
      data,
    });

    try {
      const node = await this.neo4jService.createNodeAnnotation(
        createAnnotation.id,
        user.id,
      );
      console.log('Criou nó');
    } catch {
      console.log('aqui');
    }

    return createAnnotation;
  }

  async findAll(user: User) {
    const annotations = await this.prisma.annotation.findMany({
      where: {
        userId: user.id,
      },
    });

    return annotations;
  }

  async findOne(id: string) {
    const annotation = await this.prisma.annotation.findUnique({
      where: {
        id,
      },
    });

    return { annotation };
  }

  async fullTextSearch(searchText: ISearch, user: User) {
    const search = await this.annotationModel.aggregate([
      {
        $search: {
          index: 'default',
          text: {
            query: searchText.text,
            path: {
              wildcard: '*',
            },
          },
        },
      },
    ]);

    return search;
  }

  async update(id: string, updateAnnotation: CreateAnnotationDto) {
    const annotation = await this.prisma.annotation.update({
      where: {
        id,
      },
      data: {
        ...updateAnnotation,
      },
    });
    if (!annotation) {
      throw new Error('anotação não encontrada');
    }
    return annotation;
  }

  async remove(id: string) {
    const annotation = await this.prisma.annotation.delete({
      where: {
        id,
      },
    });
    if (!annotation) {
      throw new Error('anotação não encontrada');
    }
    try {
      const node = await this.neo4jService.deleteNodeAnnotation(id);
      console.log('Deletou nó');
    } catch (error) {
      console.log(error);
    }
    return annotation;
  }
}
