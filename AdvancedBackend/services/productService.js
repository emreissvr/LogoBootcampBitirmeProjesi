
const {postgresClient} = require("../config/database/Database");




const _getAllProducts = async (req,res) => {
    
    try {

        const result = await postgresClient.query("SELECT * FROM products ");

        return result.rows;

    } catch (error) {
        console.log(error);
    }
     
}


const _getAllProductsByCategoryId =  async (req,res) =>{
    
    try {
             
        const result = await postgresClient.query('SELECT id,category_id,product_name,price,stock,description,Image,brand_name FROM products,brands WHERE category_id = $1',[req.params.categoryId]);
      
        return result.rows;
    
    } catch (error) {
        console.log(error);
        res.status(400).send("Başarısız");
    }
     
}


const _getSingleProductByProductId =  async (req,res) =>{
   
    try {

        const result = await postgresClient.query(`SELECT * FROM products WHERE id = ${req.body.id}`);

        return result.rows;

    } catch (error) {
        console.log(error);
    }
}


const _getSingleProductByCategoryIdAndProductId =  async (req,res) =>{
    try {

        const result = await postgresClient.query("SELECT * FROM products WHERE products.category_id = $1 AND products.id = $2",[req.body.category_id, req.body.id]);

        return result.rows;

    } catch (error) {
        console.log(error);
    }
}


const _getSingleProductByBrandName = async (req,res) =>{
    
    try {

        const result = await postgresClient.query(
        "SELECT  product_name,price,stock,description,brand_name  FROM products,brands  WHERE brands.brand_name = $1",[req.body.brand_name]
        );

        return result.rows;

    } catch (error) {
        console.log(error);
    }
     
}


module.exports = {
    _getAllProducts,
    _getAllProductsByCategoryId,
    _getSingleProductByProductId,
    _getSingleProductByCategoryIdAndProductId,
    _getSingleProductByBrandName,
};
    
