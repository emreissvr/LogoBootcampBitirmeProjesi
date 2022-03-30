const multer = require('multer');
const path = require("path");
const CustomError = require("../../helpers/error/CustomError");

// ilk önce storage ayarı, sonra fileFilter ayarı yapılacak
const storage = multer.diskStorage({

    // buraya request,file,callback function geliyor
    destination : function(req,file,cb){

        const rootDirectory = path.dirname(require.main.filename);
        cb(null,path.join(rootDirectory,"/public/uploads")); // hata olmadığı için ilk değerini null verdim

    },
    filename : function (req,file,cb) { 
        // File - mimetype
        const extension = file.mimetype.split("/")[1];
        req.savedProfileImage = "image_" + req.user.id + "." + extension;
        cb(null,req.savedProfileImage);

    }

})

const fileFilter = (req,file,cb) => {

    let allowedMimeTypes = ["image/jpg","image/gif","image/jpeg","image/png"];

    // gelen dosya tipi bunlardan biri değilse hata fırlat
    if(!allowedMimeTypes.includes(file.mimetype)){
        return cb(new CustomError("Please provide a valid image file",400),false);
    }

    return cb(null,true);
    
};

const productImageUpload = multer( {storage,fileFilter} );

module.exports = productImageUpload;

