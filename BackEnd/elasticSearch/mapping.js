const client = require('./client');

const addmappingToIndex = async function (indexName, mappingType, mapping) {
    
    console.log(mapping);

    return await client.indices.putMapping({
        index: indexName,
        type: mappingType,
        body: mapping
    });
}
 
module.exports = addmappingToIndex;