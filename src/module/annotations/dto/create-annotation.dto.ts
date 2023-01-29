import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateAnnotationDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsBoolean()
  important: boolean;
  @IsString()
  category: Category;
  @IsOptional()
  status?: Status;
}

export enum Category {
  Study = 'Study',
  Work = 'Work',
  Life = 'Life',
}
export enum Status {
  Performed = 'Performed',
  Progress = 'Progress',
}
