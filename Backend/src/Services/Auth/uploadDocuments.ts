import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
	region: process.env.AWS_REGION!,
});

export const uploadDocuments = async (
	filePath: string,
	file: Express.Multer.File,
) => {
	try {
		const params = {
			Bucket: process.env.AWS_BUCKET_NAME!,
			Key: `${filePath}_${file?.originalname}`,
			Body: file?.buffer,
			contentType: file?.mimetype,
		};
		const command = new PutObjectCommand(params);
		await s3.send(command);
		return "done";
	} catch (error) {
		console.log(error);
	}
};
