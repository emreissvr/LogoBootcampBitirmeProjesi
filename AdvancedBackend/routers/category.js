const express = require("express");
const { getAllCategory, getCategoryById  } = require("../controllers/categoryController");
const { checkCategoryExistByCategoryId  } = require("../middlewares/database/databaseErrorHelpers");


const router = express.Router();


// Get All Categories 
router.get("/getall", getAllCategory);
// Get All Products By Category Id
router.get("/:categoryId",checkCategoryExistByCategoryId, getCategoryById);



module.exports = router;