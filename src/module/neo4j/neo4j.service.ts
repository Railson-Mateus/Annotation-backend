import { Inject, Injectable } from '@nestjs/common';
import { Driver } from 'neo4j-driver';

@Injectable()
export class Neo4jService {
  constructor(@Inject('Neo4j') private readonly driver: Driver) {}

  async getConnection() {
    return this.driver.session().run(`MATCH (n) RETURN n LIMIT 25`);
  }
  async createNode(idAnnotation, idUser) {
    idUser = JSON.stringify(idUser);
    idAnnotation = JSON.stringify(idAnnotation);
    try {
      const query = `CREATE (a:Annotation {id: ${idAnnotation}}), (u:User {id: ${idUser}})`;
      const relacao = `MATCH (a),(u) CREATE (a)-[r:RELTYPE]->(u)`;

      await this.driver
        .session()
        .run(query)
        .then(() => console.log('Created Node'));

      await this.driver
        .session()
        .run(relacao)
        .then(() => console.log('Created Relation'));
    } catch (error) {
      console.log(error);
    }
  }
}
