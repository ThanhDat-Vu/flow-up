import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../libs/s3-client";
import dotenv from "dotenv";

dotenv.config();

export const bucketParams = { Bucket: process.env.BUCKET_NAME };

export const run = async () => {
  try {
    const data = await s3Client.send(new CreateBucketCommand(bucketParams));
    console.log("Success", data);
  } catch (err) {
    console.log("Error", err);
  }
};
run();
