const dotenv = require("dotenv")
const { uploadToS3, getFileS3 } = require("../../services/aws/s3.js");
const { S3image } = require("../../Models/index.js");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const AWS = require('aws-sdk')

dotenv.config(); 

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
    AWS.config.update({region: process.env.AWS_REGION}); 
    const region = 'us-east2'; 
    const s3 = new S3Client({region: 'us-east2'});


    const s3Images = await S3image.find({});

    const command = s3Images.map(({ filename, userId }) => {
      const response = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${userId}/${filename}`,
      });
      return response;
    });

    const url = await getSignedUrl( s3, command, { expiresIn: 36000 });

    // const url = s3Images.map(({ filename, userId }) => (
    //    getFileS3(filename, userId)
    // ));

    console.log('url map:', url)

    res.json({ s3Images });
  } catch (error) {
    console.log("error occured while getting s3 image:", error);
  }
};

module.exports = {
  uploadFile,
  getS3File,
};
