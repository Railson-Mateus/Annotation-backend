import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnotationsModule } from './module/annotations/annotations.module';
import { AuthModule } from './module/auth/auth.module';
import { JwtAuthGuard } from './module/auth/guads/jwt-auth.guard';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    UserModule,
    AnnotationsModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:96956515@cluster0.bssr30z.mongodb.net/myAnnotations?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
