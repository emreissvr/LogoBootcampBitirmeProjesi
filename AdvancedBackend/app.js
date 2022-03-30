const express = require("express");
const dotenv = require("dotenv");
const router = require("./routers")
const {postgresClient} = require("./config/database/Database");
const path = require("path");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");


dotenv.config()

// app
const app = express();
// body Middleware
app.use(express.json());
// Localhost PORT
const port = process.env.PORT;
// Routers Middleware(Main Route)
app.use('/api',router);

// Error Handler
app.use(customErrorHandler);

// static files -- image, file vb. için 
app.use(express.static(path.join(__dirname,"public")));



app.listen(port,() => {
    console.log(`App started on port ${port} : ${process.env.NODE_ENV}`);
    postgresClient.connect(err => {
        if(err){
            console.log('connection error',err.stack);
        }
        else{
            console.log('db connection successful');
        }

    })
});

