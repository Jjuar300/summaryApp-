const { uploadToS3, getFileS3 } = require("../../services/aws/s3.js");
const { S3image } = require("../../Models/index.js");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");

const client = new S3Client({region: process.env.AWS_REGION})

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const fileName = req.file.originalname;
    const { userId } = req.body;

    const Bucket = process.env.AWS_S3_BUCKET;
    const Region = process.env.AWS_REGION;
    const fileLink = `https://${Bucket}.s3.${Region}.amazonaws.com/${userId}/${fileName}`;

    const { error } = uploadToS3({ file, fileName, userId });

    await S3image.create({
      filename: fileName,
      userId: userId, 
    });

    if (error) return res.status(500).json({ message: error.message });
    return res.status(201).json({ fileLink });
  } catch (error) {
    console.log("error occured when uploading file to s3:", error);
  }
};

const getS3File = async (req, res) => {
  try {

    // console.log('body data:', req.body)

    const s3Images = await S3image.find({});
    
 const command =  s3Images.map(({filename, userId}) => {
      const response = new GetObjectCommand({Bucket: process.env.AWS_S3_BUCKET, Key: `${userId}/${filename}`}); 
       return response;
    })
    
    // const command = new GetObjectCommand({Bucket: process.env.AWS_S3_BUCKET, Key: 'user_2iLmH5ASuNDXCAJGj4EaIYrIicc/nike.jpg'}); 
    const url = await getSignedUrl(client, command, {expiresIn: 36000}); 
    // const response = await client.send(command)


    // console.log('response:',response)
    console.log('signeUrl:', url)
    console.log('images:', s3Images)
    console.log('newcommand:', command)

    res.json({s3Images, url});
  } catch (error) {
    console.log("error occured while getting s3 image:", error);
  }
};

module.exports = {
  uploadFile,
  getS3File,
};
