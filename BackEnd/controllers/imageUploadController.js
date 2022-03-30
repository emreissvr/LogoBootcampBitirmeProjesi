const { postgresClient } = require("../config/database/Database");


const imageUpload = async (req,res,next) => {


    console.log("çalıştı");
   
    // sorgu yaz burada profile image alanını güncelleyeceğiz bizde ise products --> image
    const updatedProduct = await postgresClient.query("UPDATE products SET image= $1 WHERE id = $2",[req.savedProfileImage,req.params.id]);    
    
    const product = await  postgresClient.query("SELECT * FROM products WHERE id = $1",[req.params.id]);


    return res.status(200).json({
        success:true,
        message:'ImageUpload Successful',
        data: product.rows[0] // image'ın database'de kullanıcıya kaydedildiğini görmek için verdim
    });
}

module.exports = imageUpload;