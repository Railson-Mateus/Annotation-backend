import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { AnnotationsModule } from './module/annotations/annotations.module';

@Module({
  imports: [UsersModule, AnnotationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
