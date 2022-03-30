// const User = require("../models/user");   
const CustomError = require("../helpers/error/CustomError");
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers");
const { validateUserInput,comparePassword } = require("../helpers/input/inputHelpers");
const  sendEmail = require("../helpers/libraries/sendEmail");
const _registerUser = require("../services/registerService");
const createJwtFromUser = require("../helpers/createJWT/createJwtFromUser");
const { postgresClient } = require("../config/database/Database");


const register = async (req,res,next) => {

    const user = await _registerUser(req);
    
    sendJwtToClient(user,res);

}


const login = async (req,res,next) => {

    const {email,password} = req.body; // sadece email yada sadece password gelebilir bunun için helper'da kontrol yazdım.
   
    if (!validateUserInput(email,password)) {
        return next(new CustomError("Please check your inputs",400));
    }

    const user = await postgresClient.query("SELECT * FROM users");
    

    // Eğer kullanıcı tarafından girilen password ile veritabanındaki  password birbirine eşitse login işlemi olur
    // encode edimiş password'ü decode ettik 
    if (!comparePassword(password,user.rows.password)) {
        return next(new CustomError("Please check your credentials",400))
    }
  

    sendJwtToClient(user,res);
     
}


const logout =  async (req,res,next) => {

    const {  NODE_ENV } = process.env;
    
    //  
    return res.status(200).cookie({
        httpOnly: true,
        expires: new Date(Date.now()),
        secure : NODE_ENV === "development" ? false : true 
    }).json({
        success: true,
        message: "Logout Successfull"
    })

}


const getUser  = (req,res,next) => {

    res.json({
        success: true,
        data: {
            id: req.user.id,
            username: req.user.username
        }
    });
}


const imageUpload = async (req,res,next) => {
   
    // buraya postgresclient sorgusu yaz 
    const user = await User.findByIdAndUpdate(req.user.id, {
        "profile_image": req.savedProfileImage
    }, {
        new:true, // güncellenmiş kullanıcı gelir
        runValidators : true // gelmiş olan güncellenmiş kullanıcının validation'larının da çalışması gerek
    });
    
    res.status(200).json({
        success:true,
        message:'ImageUpload Successful',
        data:user // image'ın database'de kullanıcıya kaydedildiğini görmek için verdim
    });
}


// forgot password
const forgotPassword = async (req,res,next) => {

    const resetEmail = req.body.email;
    const user = await User.findOne({ email: resetEmail});

    if (!user) {
        return next(new CustomError("There is no user with that email",400))
    }

    // user modelinden reset password token ve expire alınır
    const resetPasswordToken = user.getResetPasswordTokenFromUser();

    await user.save();

    const resetPasswordUrl = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;
    const emailTemplate = `
        <h3>Reset Your Password</h3>
        <p> This <a href = '${resetPasswordUrl}' target='_blank'>link</a> will expire in 1 hour </p>

    `;

    try {
        await sendEmail({
            from: process.env.SMTP_USER,
            to: resetEmail,
            subject: "Reset Your Password",
            html: emailTemplate
        })
        res.status(200).json({
            success:true,
            message:"Token sent to your email"
        })
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        return next(new CustomError("Email could not to be sent",500));
    }
}


// RESET PASSWORD
const resetPassword = async (req,res,next) => {

    const { resetPasswordToken } = req.query; 
    // yeni parolayı json olarak postman'den göndereceğiz 
    const { password } = req.body;

    if(!resetPasswordToken){
        return next(new CustomError("Please provide a valid token",400));
    }

    let user = await User.findOne({
        resetPasswordToken : resetPasswordToken,
        resetPasswordExpire : {
            $gt : Date.now()
        }
    });


    if(!user){
        return next(new CustomError("Invalid Token or Session Expired",404));
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();


    return res.status(200).json({
        success: true,
        message: "Reset Password Process Successful"
    });

}


const editDetails = async (req,res,next) => {

    const editInformation = req.body;

    const user = await User.findByIdAndUpdate(req.user.id, editInformation, {
        new : true,
        runValidators:true
    });

    return res.status(200).json({
        success:true,
        data: user
    });
    
}




module.exports = {
    register,
    getUser,
    login,
    logout,
    imageUpload,
    forgotPassword,
    resetPassword,
    editDetails
}