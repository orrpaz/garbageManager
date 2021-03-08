
var elasticsearch = require('elasticsearch');
const esClient = elasticsearch.Client({
    host: "http://127.0.0.1:9200",
})
esClient.indices.create({
    // id: string,
    index: "garbage",
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
module.exports = esClient