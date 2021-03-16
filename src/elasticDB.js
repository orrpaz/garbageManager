
var elasticsearch = require('elasticsearch');

class ElasticSearch{
  constructor(){
    this.esClient = elasticsearch.Client({
      host: "http://127.0.0.1:9200",
    })
    this.createIndex(process.env.INDEX_ELASTIC)
  }
  getClient(){
    return this.esClient
  }
// const esClient = elasticsearch.Client({
//     host: "http://127.0.0.1:9200",
// })

  async createIndex(index){
    const res = await this.esClient.indices.exists({
      index
    })
    if(!res){
      console.log("index not exist, create new one...")
      this.esClient.indices.create({
          // id: string,
          index: index,
          // type: string,
          // wait_for_active_shards: string,
          // refresh: 'true' | 'false' | 'wait_for',
          // routing: string,
          // timeout: string,
          // version: number,
          // version_type: 'internal' | 'external' | 'external_gte',
          // pipeline: string,
          // body: object
        })

    } else {
      console.log("index exist")
    }

  }
}

module.exports = {ElasticSearch}