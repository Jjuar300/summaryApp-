const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const {v4: uuid} = require('uuid');
const {fromIni} = require('@aws-sdk/credential-provider-ini');
const {SecretsManagerClient} = require('@aws-sdk/client-secrets-manager');

const s3 = new S3Client();
const Bucket = process.env.AWS_S3_BUCKET;

const client = new SecretsManagerClient({
  region: process.env.AWS_REGION, 
  credentials: fromIni({profile: "default_source"})
})

const uploadToS3 = async ({ file, fileName }) => {
 try {
  const key = `${fileName}`;
  
  console.log('key:', key)

  const command = new PutObjectCommand({
    Bucket: Bucket,
    Key: key,
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