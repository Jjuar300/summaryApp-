const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const { SecretsManagerClient } = require("@aws-sdk/client-secrets-manager");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client();
const Bucket = process.env.AWS_S3_BUCKET;
const Region = process.env.AWS_REGION;

const client = new SecretsManagerClient({
  region: process.env.AWS_REGION,
  credentials: fromIni({ profile: "default_source" }),
});

const uploadToS3 = async ({ file, fileName, userId }) => {
  try {
    const key = `${userId}/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: Bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    await s3.send(command);
  } catch (error) {
    console.error("error occured while uploading file to s3!", error);
    return { error };
  }
};

//getting file from s3

const getFileS3 = async ({ fileName, userId }) => {
  try {
    const key = `${userId}/${fileName}`;
    const params = {
      Bucket: Bucket,
      Key: key,
    };

    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 36000 });

    console.log("url here:", url);

    return url;
  } catch (error) {
    console.log("error occured when getting file from s3 bucket", error);
  }
};

module.exports = {
  uploadToS3,
  getFileS3,
};
