import { Inject, Injectable } from '@nestjs/common';
import { Driver } from 'neo4j-driver';

@Injectable()
export class Neo4jService {
  constructor(@Inject('Neo4j') private readonly driver: Driver) {}

  async getConnection() {
    return this.driver.session().run(`MATCH (n) RETURN n LIMIT 25`);
  }
  async createNodeUser(id) {
    id = JSON.stringify(id);
    try {
      const query = `CREATE (u:user {id: ${id}})`;

      await this.driver
        .session()
        .run(query);

    } catch (error) {
      console.log(error);
    }
  }

  async createNodeAnnotation(idAnnotation, idUser) {
    idAnnotation = JSON.stringify(idAnnotation);
    idUser = JSON.stringify(idUser);
    try {
      const query = `CREATE (a:annotation {id: ${idAnnotation}})`;

      const queryRelation =
      `MATCH (a:annotation{id:${idAnnotation}})
      OPTIONAL MATCH (u:user{id:${idUser}})
      CREATE (u)-[:CREATED]->(a)`;
      await this.driver
        .session()
        .run(query);

      await this.driver
        .session()
        .run(queryRelation);
    } catch (error) {
      console.log(error);
    }
  }
}
