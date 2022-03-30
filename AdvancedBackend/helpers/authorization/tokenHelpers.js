const createJwtFromUser = require("../createJWT/createJwtFromUser");


const sendJwtToClient = (user,res) => {

    // bu user ve responsu biz register ve login controller'larında göndericez
    // generate JWT
    const token = createJwtFromUser();
    // Burda hem JWT_COOKIE alıcaz hem de NODE_ENV alıcaz burada "development" aşamasındaysak "secure=false", "production" aşamasındaysak "secure=true" olacak
    const {JWT_COOKIE_EXPIRE,NODE_ENV} =  process.env;

    return res
    .status(200)
    .cookie("access_token", token,{
        httpOnly: true,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE) * 1000 * 60), // milisaniyeye çevirdik
        secure: NODE_ENV === "development" ? false : true
    })
    .json({
        success: true,
        access_token: token,
        data: {
            username: user.username,
            email : user.email
        }
    });


    // Response 
};

// token yerleştirilmiş mi yerleştirilmemiş mi kontrol ediceksin 
const isTokenIncluded = (req) => {

    return (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
    );
};


const getAccessTokenFromHeader = (req) => {

    const authorization = req.headers.authorization;
    const access_token = authorization.split(" ")[1]; // bearer değil access_token'ı aldım.
    return access_token; 

}


module.exports = {
    sendJwtToClient,
    isTokenIncluded,
    getAccessTokenFromHeader
}
