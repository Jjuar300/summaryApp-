const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const {v4: uuid} = require('uuid');

const s3 = new S3Client();
const Bucket = process.env.AWS_S3_BUCKET;

const uploadToS3 = async ({ file, userId }) => {
 try {
  const key = `${userId}/${uuid()}`;
  const command = new PutObjectCommand({
    Bucket: Bucket,
    key: key,
    Body: file.buffer,
    ContentType: file.mimetype, 
  });
  await s3.send(command); 
  return {key}; 
 } catch (error) {
  console.error('error occured while uploading file to s3!', error)
  return{error} 
}
};

module.exports = {
uploadToS3, 
}