const CustomError = require("../../helpers/error/CustomError");
// const User = require("../../models/user"); BUUNUN İÇİNDE SORGU İLE ÇEK
const jwt = require("jsonwebtoken");
const {isTokenIncluded,getAccessTokenFromHeader} = require("../../helpers/authorization/tokenHelpers")
// const Question = require("../../models/Question");   BUNUN YERİNE PRODUCT KOY



const getAccessToRoute = (req,res,next) => {

    // token
    //  ya doğru bir formda değildir yada kullanıcı herhangi bir token göndermemiştir.
    const {JWT_SECRET_KEY} = process.env;

    // herhangi bir token gelmemiştir ya da token doğru bir formda değildir 
    if(!isTokenIncluded(req)){
        return next(new CustomError("You are not authorized to access this route",401));
    }

    const accessToken = getAccessTokenFromHeader(req);
    
    jwt.verify(accessToken, JWT_SECRET_KEY, (err,decoded) => {
        
        if (err) {
            return next(new CustomError("You are not authorized to access this route",401));
            // herhangi bir hata varsa bu token'ın süresi geçmiş demektir
        }

        req.user = {
            id: decoded.id,
            username: decoded.username,
            
        }

        console.log(decoded);
        next(); 

    });
    // CustomError
};


const getAdminAccess =  async (req,res,next) => {

    const {id} = req.user;

    const user = await User.findById(id);

    if(user.role !== "admin"){
        return next(new CustomError("Only admins can access this route",403));
    }
    next();

}


const getQuestionOwnerAccess =  async (req,res,next) => {

    const userId = req.user.id;
    const questionId = req.params.id;
     
    const  question = await Question.findById(questionId);

    if(question.user != userId){
        return next(new CustomError("Only Owner can handle this operation",403));
    }
    next();
} 


module.exports = {
    getAccessToRoute,
    getAdminAccess,
    getQuestionOwnerAccess
};