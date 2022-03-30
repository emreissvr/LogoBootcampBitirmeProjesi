const express = require("express");
const {register,getUser, login, logout, imageUpload, forgotPassword, resetPassword, editDetails} = require("../controllers/auth");
const productImageUpload = require("../middlewares/utils/productImageUpload");
const { getAccessToRoute} = require("../middlewares/authorization/auth");


const router = express.Router();

// register
router.post("/register", register);
// login
router.post("/login", login);
// upload
router.post("/upload",[getAccessToRoute,productImageUpload.single("profile_image")],imageUpload); // post olarak gönderilen profile_image key'ine göre bu image upload edilecek
// forgot password
router.post("/forgotpassword",forgotPassword);
// profile
router.get("/profile",getAccessToRoute, getUser);
// logout
router.get("/logout",getAccessToRoute, logout);
// reset password
router.put("/resetpassword", resetPassword);
// edit details
router.put("/edit",getAccessToRoute, editDetails);


module.exports = router;