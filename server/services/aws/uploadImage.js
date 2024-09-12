
const {PutObjectCommand, S3Client} = require('@aws-sdk/client-s3')
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner'); 

const s3Client = new S3Client({
  region:process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
})

const createPreSignendPost = async ({key, contentType}) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET, 
    Key: key, 
    ContentType: contentType, 
  })

  const fileLink = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 5 * 60, 
  }); 

  console.log('key:', key)

  return {fileLink, signedUrl}
}



module.exports = {
    createPreSignendPost, 
}