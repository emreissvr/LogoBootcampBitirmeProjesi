const { postgresClient} = require("../config/database/Database");

const _getAllCategory = async (req,res) =>{
    
    try {

        const result = await postgresClient.query("SELECT * FROM CATEGORIES ");
        return result.rows;

    } catch (error) {
        console.log(error);
    }
     
}

const _getCategoryById = async (req,res) => {

    try {

        // böyle oluyor mu bilmiyorum bir kontrol et
        const result = await postgresClient.query(`SELECT * FROM CATEGORIES WHERE id = ${req.params.categoryId}`);
        
        return result.rows;

    } catch (error) {
        console.log(error);
    }
     
}

module.exports = {
    _getAllCategory,
    _getCategoryById
}