const { uploadToS3, getFileS3 } = require('../../services/aws/s3.js');


const uploadFile = async (req, res) => {
try {
    const file = req.file;
    const fileName = req.file.originalname;
    const {userId} = req.body; 
    console.log('userId:', userId); 
  
    // const userId = req.headers["x-user-id"];
    const Bucket = process.env.AWS_S3_BUCKET;
    const Region = process.env.AWS_REGION;
    const fileLink = `https://${Bucket}.s3.${Region}.amazonaws.com/${fileName}`
  
    console.log("fileName:", fileName);
    console.log("userId:", userId);
  
    console.log("file:", req.file);
    const { error} = uploadToS3({ file, fileName, userId });
   
    
    
    console.log("fileLink:", fileLink);
    if (error) return res.status(500).json({ message: error.message });
    return res.status(201).json({ fileLink });
} catch (error) {
    console.log('error occured when uploading file to s3:', error)
}
}; 

module.exports = {
    uploadFile, 
}