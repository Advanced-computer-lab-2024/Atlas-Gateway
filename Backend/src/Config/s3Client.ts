import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "AKIAZ24IS2HM5DOWRS57",
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "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",
	},
	region: process.env.AWS_REGION ?? "eu-north-1",
});

export default s3;
