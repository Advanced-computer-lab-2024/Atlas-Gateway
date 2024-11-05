import { NextFunction, Request, Response } from "express";

import * as mediaService from "../../Services/Media/media.service";

export const upload = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const file = req.file as Express.Multer.File | undefined;
		const { userType, userId, fileType } = req.body;
		if (!file) {
			return res.status(400).send("File is required");
		}
		const result = await mediaService.upload(
			userType,
			userId,
			fileType,
			file,
		);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
};

export const download = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { filePath } = req.body;
		const result = await mediaService.download(filePath);
		if (result == "File not found") {
			return res.status(404).send(result);
		}
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
};
