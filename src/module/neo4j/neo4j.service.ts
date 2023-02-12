import { Inject, Injectable } from '@nestjs/common';
import { Driver } from 'neo4j-driver';

@Injectable()
export class Neo4jService {
  constructor(@Inject('Neo4j') private readonly driver: Driver) { }

  async getConnection() {
    return this.driver.session();
  }
  async createNode(idAnnotation, idUser) {
    console.log(' passou ');

    // try{
    //   const query = `MATCH (p1:Pessoa), (p2.Pessoa)
    //   WHERE p1.email="${email1}" AND p2.email="${email2}"
    //   CREATE (p1)-[:AMIGO]->(p2)`;
    //   await session.run(query).then(result=> console.log(result.summary.counters._stats.relatationshipsCreated));
    //   )finally{
    //     await session,close();
    //   }
    //}
    this.driver.session().run(`CREATE (a:${idAnnotation}),(u:${idUser})`);
    const relacao = this.driver
      .session()
      .run(`MATCH (a),(u) CREATE (a)-[:RELTYPE]->(u) `);

    return relacao;
  }
}
