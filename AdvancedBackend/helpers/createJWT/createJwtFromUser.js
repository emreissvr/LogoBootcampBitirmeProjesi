const jwt = require("jsonwebtoken");
const { postgresClient } = require("../../config/database/Database");


const createJwtFromUser = async (req,res) => {

    const {username} = req.body;

    const userforJWT = await postgresClient.query("SELECT id,username FROM users WHERE username = $1",[username]);

    const {JWT_SECRET_KEY,JWT_EXPIRE} = process.env;
    // payload objesini oluşturucaz
    const payload = {
        id: userforJWT.rows.id,
        name: userforJWT.rows.name
    };
    // aynı zamanda bize secret key ve inspare süresi gerekli
    const token = jwt.sign(payload,JWT_SECRET_KEY, {
        expiresIn : JWT_EXPIRE
    });
    return token;
}

module.exports = createJwtFromUser;