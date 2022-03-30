const bcrypt = require("bcryptjs");
const {postgresClient} = require("../config/database/Database");

const _registerUser = async (req,res,next) => {
    
    const {username, email, password, role} = req.body;
    
    // hashlenmiş parola değişmemişse (yani update password şeklinde bir url çalışmamışsa) hashlenmis kısmı bir daha çalıştırmaya gerek yok 
    const passwordDb = await postgresClient('SELECT password FROM users WHERE users.username = $1',[username])
    if (password == passwordDb) {
        next(); 
    }
    // password hashlendi
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err); // eğer hata varsa next() ile customErrorHandler'a gider
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            // eğer herhangi bri hata olmamışsa parola hashlenmiş demektir
            this.password = hash;
            // next() diyerekte uygulamamıza devam ettik 
 
        });
    });

    // hashlenmiş password kayıt edildi
    const result = postgresClient.query('INSERT INTO users(username, email, password, role) VALUES($1, $2, $3, $4) RETURNING *',[username,email,password,role]);


    return result.rows;

}



module.exports = _registerUser;