import { Injectable } from '@nestjs/common';
import { CreateAnnotationDto } from './dto/create-annotation.dto';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class AnnotationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAnnotationDto: CreateAnnotationDto) {
    const data={
      ...createAnnotationDto,
      userId: "wijfieorjfoerjfe",
    }

   const createAnnotation = await this.prisma.annotation.create({
    data,
   })

   return createAnnotation
  }

  async findAll() {
    const annotations= await this.prisma.annotation.findMany()
    return annotations
  }

  findOne(id: number) {
    return `This action returns a #${id} annotation`;
  }

  async update(id: string, updateAnnotation: CreateAnnotationDto) {
    const annotation = await this.prisma.annotation.update({
      where:{
        id,
      },
      data:{
        ...updateAnnotation
      }
    })
    if(!annotation){
      throw new Error("anotação não encontrada")
    }
    return annotation
  }

  async remove(id: string) {
    const annotation = await this.prisma.annotation.delete({
      where:{
        id,
      },
    })
    if(!annotation){
      throw new Error("anotação não encontrada")
    }
    return annotation
  }
}
