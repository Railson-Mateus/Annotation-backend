import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AnnotationsService } from './annotations.service';
import { CreateAnnotationDto } from './dto/create-annotation.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from 'src/module/user/entities/user.entity';

@Controller('annotations')
export class AnnotationsController {
  constructor(private readonly annotationsService: AnnotationsService) {}

  @Post()
  create(
    @Body() createAnnotationDto: CreateAnnotationDto,
    @CurrentUser() user: User,
  ) {
    return this.annotationsService.create(createAnnotationDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.annotationsService.findAll(user);
  }

  @Get('fullTextSearch')
  fullTextSearch() {
    return this.annotationsService.fullTextSearch();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnnotationDto: CreateAnnotationDto,
  ) {
    return this.annotationsService.update(id, updateAnnotationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.annotationsService.remove(id);
  }
}
