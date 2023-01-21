import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AnnotationsModule } from './module/annotations/annotations.module';
import { AuthModule } from './module/auth/auth.module';
import { JwtAuthGuard } from './module/auth/guads/jwt-auth.guard';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [UserModule, AnnotationsModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
