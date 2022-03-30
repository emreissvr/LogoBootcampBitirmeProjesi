const express = require("express");
const imageUpload = require("../controllers/imageUploadController");
const {getAllProducts, getAllProductsByCategoryId, getSingleProductByProductId, getSingleProductByCategoryIdAndProductId, getSingleProductByBrandName, addProduct} = require("../controllers/productController");
const { checkProductExistById, checkProductExistByBrandname, checkProductExistByCategoryId } = require("../middlewares/database/databaseErrorHelpers");
const productImageUpload = require("../middlewares/utils/productImageUpload");


const router = express.Router();


// Get All Products 
router.route("/getall").get(getAllProducts);
// Get All Products By Category Id
router.get("/:categoryId", checkProductExistByCategoryId, getAllProductsByCategoryId);
// Get Single Product By Product Id
router.post("/productId",checkProductExistById, getSingleProductByProductId);
// Get Single Product By Caegory Id and Product Id
router.post("/category_idAndproduct_id",checkProductExistById, checkProductExistByCategoryId, getSingleProductByCategoryIdAndProductId);
// Get Single Product By Brand Name
router.post("/brandName",checkProductExistByBrandname, getSingleProductByBrandName);
// upload image
router.post("/:id/upload", productImageUpload.single("image"), imageUpload);
// product add
router.post("/add", productImageUpload.single("image"), addProduct);




module.exports = router;