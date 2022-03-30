
const Client = require('./client');

const createIndex = async function (indexName) {
    try {
        return await Client.indices.get({
            index: indexName
        });
    }
    catch (e) {
        return await esClient.indices.create({
            index: indexName
        });
    }
}
 
module.exports = createIndex;