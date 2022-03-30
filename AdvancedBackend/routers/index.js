const express = require("express");
// Routerlar ana routerlar buradan dağılacak 
const product = require("./product");
const category = require("./category");

const router = express.Router();




router.use("/product",product);
router.use("/category",category);

// // isterlerse  USER,AUTH(Register,Login),ADMIN
// // router.use("/auth",auth);
// // router.use("/users",user);
// // router.use("/admin",admin);

module.exports = router;


