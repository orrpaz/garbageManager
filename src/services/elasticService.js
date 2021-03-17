
var elasticsearch = require('elasticsearch');

class ElasticService{
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
          body:{
            mappings:{
                properties: {
                  location: {
                    type: "geo_point"
                  }
                }
              }
            }
          
        })

    } else {
      console.log("index exist")
    }

  }
}

module.exports = {ElasticService}