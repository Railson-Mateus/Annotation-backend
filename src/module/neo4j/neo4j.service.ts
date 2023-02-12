import { Inject, Injectable } from '@nestjs/common';
import { Driver } from 'neo4j-driver';

@Injectable()
export class Neo4jService {
  constructor(@Inject('Neo4j') private readonly driver: Driver) {}

  async getConnection() {
    return this.driver.session();
  }
}
