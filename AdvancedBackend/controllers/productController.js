
const logger = require("../helpers/logger/products");
const {
    _getAllProducts,
    _getAllProductsByCategoryId,
    _getSingleProductByCategoryIdAndProductId, 
    _getSingleProductByProductId, 
    _getSingleProductByBrandName
} = require("../services/productService");
 
    


const getAllProducts = async (req,res) => {

    const products = await _getAllProducts(req);

    logger.log({
        level:"info",
        message:products
    });
    
    return res.status(200).json({
        success:true,
        data : products 
    });
};


const  ImageAdd = async(req,res) => {

    const fileName = updateProductImage(req);
    const result = await addProduct(req,res,fileName);

    logger.log({
        level:"info",
        message:result
    });

    return res.status(200).json({
        success:true,
        data : result 
    });


}




const getAllProductsByCategoryId = async (req,res) => {

    

    try {

        const products = await _getAllProductsByCategoryId(req);
        
        logger.log({
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

    console.log("by product çalıştı");

    const products = await _getSingleProductByProductId(req);

    logger.log({
        level:"info",
        message:products
    });
    
    return res.status(200).json({
        success:true,
        data : products 
    });

}



const getSingleProductByCategoryIdAndProductId = async (req,res) => {

    const products = await _getSingleProductByCategoryIdAndProductId(req);

    logger.log({
        level:"info",
        message:products
    });
    
    return res.status(200).json({
        success:true,
        data : products 
    });

}


const getSingleProductByBrandName = async (req,res) => {

    const products = await _getSingleProductByBrandName(req);

    logger.log({
        level:"info",
        message:products
    });
    
    return res.status(200).json({
        success:true,
        data : products 
    });

}

module.exports =
{
    getAllProducts,
    getAllProductsByCategoryId,
    getSingleProductByProductId,
    getSingleProductByCategoryIdAndProductId,
    getSingleProductByBrandName
};
    
