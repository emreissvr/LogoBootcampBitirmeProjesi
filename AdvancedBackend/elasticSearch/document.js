const client = require('./client');

const insertDocument = async function (indexName, _id, mappingType, data) {
    
    return await client.index({
        index: indexName,
        type: mappingType,
        id: _id,
        body: data
    });
}
 
module.exports = insertDocument;