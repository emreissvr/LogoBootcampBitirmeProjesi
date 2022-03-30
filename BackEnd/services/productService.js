
const {postgresClient} = require("../config/database/Database");




const _getAllProducts = async (req,res) => {
    
    try {

        const result = await postgresClient.query("SELECT * FROM products ");

        return result.rows;

    } catch (error) {
        console.log(error);
    }
     
}


const _addProduct = async (req,res) => {
    
    try {

        const result = await postgresClient.query('INSERT INTO products (product_name,category_id,price,stock,description,image,brand_name) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING * ',
        [req.body.product_name, req.body.category_id, req.body.price, req.body.stock, req.body.description, req.savedProfileImage, req.body.brand_name]);

        return result.rows;

    } catch (error) {
        console.log(error);
    }
     
}




const _getAllProductsByCategoryId =  async (req,res) =>{
    
    try {
             
        const result = await postgresClient.query('SELECT * FROM products WHERE category_id = $1',[req.params.categoryId]);
      
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
        "SELECT * FROM products WHERE brand_name = $1",[req.body.brand_name]
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
    _addProduct
};
    
