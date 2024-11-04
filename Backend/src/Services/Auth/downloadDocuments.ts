import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import s3 from "../../Config/s3Client";

export const downloadDocuments = async (filePath: string) => {
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
