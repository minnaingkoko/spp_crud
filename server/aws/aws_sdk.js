require('dotenv').config()
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
// Set the AWS Region.
const REGION = "ap-south-1"; //e.g. "us-east-1"

// Configure AWS credentials and region
const credentials = {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

const s3ClientD = new S3Client({
    region: REGION,
    credentials: credentials,
});

// Create an Amazon S3 service client object.
exports.s3Client = new S3Client({
    region: REGION,
    credentials: credentials,
});



exports.s3Delete = async (bucket, key) => {
    const deleteCommand = new DeleteObjectCommand({ Bucket: bucket, Key: key });
    await s3ClientD.send(deleteCommand);
}