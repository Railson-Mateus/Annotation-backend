import { Injectable } from '@nestjs/common';
import { CreateAnnotationDto } from './dto/create-annotation.dto';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class AnnotationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAnnotationDto: CreateAnnotationDto) {
    const data={
      ...createAnnotationDto
    }
   const createAnnotation = await this.prisma.annotation.create({
    data,
   })
   return createAnnotation
  }

  findAll() {
    return `This action returns all annotations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} annotation`;
  }

  update(id: number, createAnnotationDto: CreateAnnotationDto) {
    return `This action updates a #${id} annotation`;
  }

  remove(id: number) {
    return `This action removes a #${id} annotation`;
  }
}
