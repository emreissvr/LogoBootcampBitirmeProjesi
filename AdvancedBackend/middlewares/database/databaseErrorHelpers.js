const CustomError = require("../../helpers/error/CustomError");
const {postgresClient} = require("../../config/database/Database");




const checkProductExistById = async (req,res,next) => {

    const {id} = req.body;
    
    const product = await postgresClient.query("SELECT * FROM products  WHERE products.id = $1 ",[id]);
    
    

    if(!product){
        return next(new CustomError("There is no such product with that id",400));
    }
    // kullanıcı var ise yani hata yok ise next() ile bir sonraki controllers'a yani user.js controllerına gidicek
    next();

}

const checkProductExistByCategoryId = async (req,res,next) => {
    
    const product = await postgresClient.query("SELECT * FROM products WHERE category_id = $1",[req.params.categoryId])
    
    if(!product){
        return next(new CustomError("There is no such product with that category id",400));
    }
    // kullanıcı var ise yani hata yok ise next() ile bir sonraki controllers'a yani user.js controllerına gidicek
    next();

}


const checkProductExistByBrandname =  async (req,res,next) => {

    
    
    const product = await postgresClient.query("SELECT product_name,price,stock,description,brand_name FROM products,brands WHERE  brands.brand_name = $1",[req.body.brand_name])
    
    if(!product){
        return next(new CustomError("There is no such product with that brand name",400));
    }
    // kullanıcı var ise yani hata yok ise next() ile bir sonraki controllers'a yani user.js controllerına gidicek
    next();

}


const checkCategoryExistByCategoryId =  async (req,res,next) => {

    const {categoryId} = req.params;
    
    const category = await postgresClient.query("SELECT category_name FROM categories WHERE id = $1",[categoryId])
    
    if(!category){
        return next(new CustomError("There is no such category with that category id",400));
    }
    // kullanıcı var ise yani hata yok ise next() ile bir sonraki controllers'a yani user.js controllerına gidicek
    next();

}


const checkUserExist = async (req,res,next) => {

    const {id} = req.params;

    // const user = await User.findById(id);  SORGU YAZ BURAYA

    if(!user){
        return next(new CustomError("There is no such user with that id",400));
    }

    // kullanıcı var ise yani hata yok ise next() ile bir sonraki controllers'a yani user.js controllerına gidicek
    next();

}





module.exports = {
    checkProductExistById,
    checkProductExistByCategoryId,
    checkProductExistByBrandname,
    checkCategoryExistByCategoryId,
    checkUserExist
} 