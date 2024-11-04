import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import s3 from "../../Config/s3Client";

export const upload = async (filePath: string, file: Express.Multer.File) => {
	try {
		console.log(filePath);
		const params = {
			Bucket: process.env.AWS_BUCKET_NAME!,
			Key: `${filePath}_${file?.originalname}`,
			Body: file?.buffer,
			contentType: file?.mimetype,
		};
		const command = new PutObjectCommand(params);
		await s3.send(command);
		return "Uploaded";
	} catch (error) {
		console.log(error);
	}
};

export const download = async (filePath: string) => {
	try {
		const command = new GetObjectCommand({
			Bucket: process.env.AWS_BUCKET_NAME!,
			Key: `${filePath}`,
		});
		await s3.send(command);
		return await getSignedUrl(s3, command, { expiresIn: 3600 });
	} catch (error) {
		return "File not found";
	}
};
