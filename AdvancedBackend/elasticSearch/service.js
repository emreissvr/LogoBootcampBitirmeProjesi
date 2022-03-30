const Client = require("./client");
const elasticIndex = require('./index');
const elasticMap = require('./mapping');
const elasticDocument = require('./document');

Client.ping({ requestTimeout:1000 }, async function(error){

    if (error) {

        console.log('ElasticSearch Ayakta değil(erişilmiyor)');

    } else {

        console.log('Elasticsearch ayakta(erişiliyor)');

        try {
            
            // Create Index
            const response = await elasticIndex('ECommerceDB');
            console.log("Index: " + response);

            // Create Mapping(Categories, Products, Brands) 
            const categoryMapping = {
                properties:{
                    categoryName:{
                        type:"text"
                    }
                }
            }

            const productMapping = {
                properties:{
                    productName:{
                        type:"text"
                    }
                }
            }

            const brandMapping = {
                properties:{
                    brandName:{
                        type:"text"
                    },
                    categoryId:{
                        type:"integer"
                    }
                }
            }

            const responseCategoryMap = await elasticMap('ECommerceDB','Categories',categoryMapping);
            const responseProductMap = await elasticMap('ECommerceDB','Products',productMapping);
            const responseBrandMap = await elasticMap('ECommerceDB','Brands',brandMapping);

            // send data to elasticsearch
            // buradaki tüm products, categories, brands tablolarındaki bilgileri çekicez buradaki document'a aktarıca
            

        } catch (err) {
            console.log(err);
        }
        
    
    }
});




// const elasticSearch = require('./search');
 
//             const body = {
//                 query: {
//                     match_phrase_prefix: {
//                         "title": "Death"
//                     }
//                 }
//             }
//             const resSearch = await elascticSearch('games', 'categorystore', body);
//             console.log(`Adı: ${resSearch.hits.hits[0]._source.title}\nAçıklama: ${resSearch.hits.hits[0]._source.body}`);


//             const body = {
//                 query: {
//                     match: {
//                         "title": "Duty"
//                     }
//                 },
//                 aggs: {
//                     tags: {
//                         terms: {
//                             field: 'tags'
//                         }
//                     }
//                 }
//             }
//             const resagSearch = await elascticSearch('games', 'categorystore', body);
//             console.log(`Adı: ${resagSearch.hits.hits[0]._source.title}\nAçıklama: ${resagSearch.hits.hits[0]._source.body}`);
//             console.log(`Aggregations Key1 - Document Count: ${resagSearch.aggregations.tags.buckets[0].key} - ${resagSearch.aggregations.tags.buckets[0].doc_count}`);
//             console.log(`Aggregations Key2 - Document Count: ${resagSearch.aggregations.tags.buckets[1].key} - ${resagSearch.aggregations.tags.buckets[1].doc_count}`);