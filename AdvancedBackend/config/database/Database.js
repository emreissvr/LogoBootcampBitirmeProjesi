// const pg = require("pg");
// const Pool = pg.Pool();
// // şimdi konfigürasyonlarımızı kurabiilriiz 

// const pool = new Pool({
//     user: "postgres",
//     password: "Esem29291649",  // şifreyi gir
//     host: "localhost",
//     port: 5432,
//     database: "eommerce",
// });

// const connectDatabase = () => {
//     pool
//   .connect()
//   .then(() => console.log(`PostgreSQL connection is successful. `))
//   .catch(err => console.error('Database connection error', err));
// }


// module.exports = {
//     connectDatabase,
//     pool,
// }; 

// // postgre sorgularımızı index.js'te çalıştırabiliriz yada o sorguları farklı bir dosya içine alırız 


const pg = require("pg")
const dotenv = require("dotenv");

dotenv.config(); 

console.log( process.env.DB_CONNECTION_STRING);

const postgresClient = new pg.Pool({
        connectionString: process.env.DB_CONNECTION_STRING
})



module.exports = {postgresClient};
