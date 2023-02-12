import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnotationsModule } from './module/annotations/annotations.module';
import { AuthModule } from './module/auth/auth.module';
import { JwtAuthGuard } from './module/auth/guads/jwt-auth.guard';
import { UserModule } from './module/user/user.module';
import { Neo4jModule } from './module/neo4j/neo4j.module';

@Module({
  imports: [
    UserModule,
    AnnotationsModule,
    AuthModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    Neo4jModule,
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
