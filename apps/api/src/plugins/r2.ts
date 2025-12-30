import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { config } from "../config/env";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${config.r2.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: config.r2.accessKeyId,
    secretAccessKey: config.r2.secretAccessKey,
  },
});

export async function uploadToR2(
  key: string,
  body: Buffer,
  contentType: string
): Promise<string> {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: config.r2.bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );

  return `${config.r2.publicUrl}/${key}`;
}

export async function deleteFromR2(key: string): Promise<void> {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: config.r2.bucketName,
      Key: key,
    })
  );
}

export function getKeyFromUrl(url: string): string {
  const publicUrl = config.r2.publicUrl;
  if (url.startsWith(publicUrl)) {
    return url.slice(publicUrl.length + 1);
  }
  return url;
}
