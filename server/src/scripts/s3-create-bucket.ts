// Get service clients module and commands using ES6 syntax.
import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../libs/s3-client";

// Set the bucket parameters.
export const bucketParams = { Bucket: "flow-up--avatars" };

// Create the Amazon S3 bucket.
export const run = async () => {
  try {
    const data = await s3Client.send(new CreateBucketCommand(bucketParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};
run();

// npx ts-node src\scripts\s3-create-bucket.ts
