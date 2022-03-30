const elasticSearch = require('elasticsearch');

const client = new elasticSearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

 
module.exports = client;



// elasticsearch.bat yaz command line'a
// kibana.bat yaz client'a
