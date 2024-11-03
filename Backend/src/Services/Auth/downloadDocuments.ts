import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
	region: process.env.AWS_REGION!,
});

export const downloadDocuments = async (filePath: string) => {
	console.log(filePath);
	const command = new GetObjectCommand({
		Bucket: process.env.AWS_BUCKET_NAME!,
		Key: `${filePath}`,
	});
	const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
	return url;
};
