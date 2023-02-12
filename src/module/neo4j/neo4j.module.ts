import { Module } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { Neo4jController } from './neo4j.controller';
import neo4j from 'neo4j-driver';

export const neo4jProvider = {
  provide: 'Neo4j',
  useFactory: () =>
    neo4j.driver(
      process.env.URL,
      neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
    ),
};

@Module({
  exports: ['Neo4j'],
  controllers: [Neo4jController],
  providers: [neo4jProvider, Neo4jService],
})
export class Neo4jModule { }
