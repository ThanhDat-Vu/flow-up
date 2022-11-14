import dotenv from "dotenv";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();
const REGION = process.env.REGION;

export const s3Client = new S3Client({ region: REGION });

export async function createPresignedUrlToUpload() {
  const bucketName = process.env.BUCKET_NAME || "";
  const key = Math.random().toString(36).slice(2);
  const uploadParams = {
    Bucket: bucketName,
    Key: key,
    ACL: "public-read",
  };
  try {
    const command = new PutObjectCommand(uploadParams);
    return await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
  } catch (err) {
    console.log(err);
  }
}
