
const { postgresClient } = require("../config/database/Database");
const logger = require("../helpers/logger/products");
const {
    _getAllProducts,
    _getAllProductsByCategoryId,
    _getSingleProductByCategoryIdAndProductId, 
    _getSingleProductByProductId, 
    _getSingleProductByBrandName,
    _addProduct
} = require("../services/productService");
 
    


const getAllProducts = async (req,res) => {

    try {
        const products = await _getAllProducts(req);

        await logger.log({
            level:"info",
            message:products
        });
        
        return res.status(200).json({
            success:true,
            data : products 
        });
    } catch (error) {

        return res.status(400).json({
            message: error.message 
        });
    }
    
};


const addProduct = async (req,res,next) => {

    try {
        const product = await _addProduct(req);

        await  logger.log({
            level:"info",
            message:product
        });
    
        res.status(200).json({
            success:true,
            data:product
        })
    } catch (error) {

        return res.status(400).json({
            message: error.message 
        });

    }
    
}


const getAllProductsByCategoryId = async (req,res) => {

    

    try {

        const products = await _getAllProductsByCategoryId(req);
        
        await logger.log({
            level:"info",
            message:products
        });

        return res.status(200).json({
            success:true,
            data : products 
        });

    } catch (error) {

        return res.status(400).json({
            message: error.message 
        });
    }
    
   

}


const getSingleProductByProductId = async (req,res) => {

    try {
        
        const products = await _getSingleProductByProductId(req);

        await logger.log({
            level:"info",
            message:products
        });
        
        return res.status(200).json({
            success:true,
            data : products 
        });

    } catch (error) {
        
        return res.status(400).json({
            message: error.message 
        });

    }
}



const getSingleProductByCategoryIdAndProductId = async (req,res) => {

    try {
        
        const products = await _getSingleProductByCategoryIdAndProductId(req);

        await logger.log({
            level:"info",
            message:products
        });
        
        return res.status(200).json({
            success:true,
            data : products 
        });

    } catch (error) {
        
        return res.status(400).json({
            message: error.message 
        });

    }
    

}


const getSingleProductByBrandName = async (req,res) => {


    try {
        
        const product = await _getSingleProductByBrandName(req);

        await logger.log({
            level:"info",
            message:product
        });
        
        return res.status(200).json({
            success:true,
            data : product 
        });

    } catch (error) {
        
        return res.status(400).json({
            message: error.message 
        });
    }
    

}

module.exports =
{
    getAllProducts,
    getAllProductsByCategoryId,
    getSingleProductByProductId,
    getSingleProductByCategoryIdAndProductId,
    getSingleProductByBrandName,
    addProduct
};
    
