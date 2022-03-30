const logger = require("../helpers/logger/Categories");
const {
    _getAllCategory,
    _getCategoryById, 
} = require("../services/categoryService");



const getAllCategory = async (req,res) => {

    const categories = await _getAllCategory(req);

    logger.log({
        level:"info",
        message:categories
    });
    
    return res.status(200).json({
        success:true,
        data : categories 
    });

}

const getCategoryById = async (req,res,next) => {

    const categories = await _getCategoryById(req);

    logger.log({
        level:"info",
        message:categories
    });
    
    return res.status(200).json({
        success:true,
        data : categories 
    });

}



module.exports = {
    getAllCategory,
    getCategoryById
}