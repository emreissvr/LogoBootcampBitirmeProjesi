const express = require("express");
// Routerlar ana routerlar buradan dağılacak 
const product = require("./product");
const category = require("./category");

const router = express.Router();

router.use("/product",product);
router.use("/category",category);

console.log(product);

module.exports = router;


