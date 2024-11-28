import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

import s3 from "../../Config/s3Client";
import * as productService from "../../Services/Purchases/product.service";
import * as advertiserService from "../../Services/Users/advertiser.service";
import * as sellerService from "../../Services/Users/seller.service";
import * as tourGuideService from "../../Services/Users/tourGuide.service";
import * as placeService from "../Travel/places.service";

export const upload = async (
	userType: string,
	userId: string,
	fileType: string,
	file: Express.Multer.File,
) => {
	try {
		const randomName = (bytes = 16) =>
			crypto.randomBytes(bytes).toString("hex");
		const filePath = `${userType}/${randomName()}_${file.originalname}`;
		const payload =
			fileType === "image"
				? {
						imagePath: filePath,
					}
				: fileType === "id"
					? {
							idPath: filePath,
						}
					: fileType === "taxCard"
						? {
								taxCardPath: filePath,
							}
						: {
								certificatePath: filePath,
							};
		const params = {
			Bucket: process.env.AWS_BUCKET_NAME ?? "atlasgateway",
			Key: filePath,
			Body: file?.buffer,
			contentType: file?.mimetype,
		};
		const command = new PutObjectCommand(params);
		await s3.send(command);
		switch (userType) {
			case "product":
				await productService.updateProduct(userId, payload);
			case "advertiser":
				await advertiserService.updateAdvertiser(
					userId,
					userId,
					payload,
				);
			case "seller":
				await sellerService.updateSeller(userId, userId, payload);
			case "tour_guide":
				await tourGuideService.updateTourGuide(userId, userId, payload);
			case "place":
				const place = await placeService.getPlaceById(userId);
				await place.updateOne({ $push: { imagesPath: filePath } });
		}
		return "uploaded";
	} catch (error) {
		console.log(error);
	}
};

export const download = async (filePath: string) => {
	try {
		const command = new GetObjectCommand({
			Bucket: process.env.AWS_BUCKET_NAME ?? "atlasgateway",
			Key: `${filePath}`,
		});
		console.log(filePath);
		await s3.send(command);
		return await getSignedUrl(s3, command, { expiresIn: 3600 });
	} catch (error) {
		return "File not found";
	}
};
