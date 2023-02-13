import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../../database/PrismaService';
import { Neo4jService } from '../neo4j/neo4j.service';
import { Neo4jModule } from '../neo4j/neo4j.module';

@Module({
  imports: [
    Neo4jModule
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService, Neo4jService],
  exports: [UserService]
})
export class UserModule {}
