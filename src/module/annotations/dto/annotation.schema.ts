import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category, Status } from './create-annotation.dto';

export type AnnotationDocument = HydratedDocument<Annotation>;

@Schema()
export class Annotation {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  important: boolean;

  @Prop()
  category: Category;

  @Prop()
  status?: Status;
}

export const AnnotationSchema = SchemaFactory.createForClass(Annotation);
