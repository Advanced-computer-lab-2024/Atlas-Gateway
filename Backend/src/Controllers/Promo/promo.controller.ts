import crypto from "crypto";
import { Request, Response } from "express";
import { Types } from "mongoose";

import { promo } from "../../Models/Promo/promo.model";

export const createPromo = async (req: Request, res: Response) => {
	try {
		const { expiryDate, discountPercentage, allUsers, users } = req.body;

		// Validate input
		if (!expiryDate || !discountPercentage || allUsers === undefined) {
			return res
				.status(400)
				.json({ message: "Missing required parameters" });
		}

		if (!allUsers && (!Array.isArray(users) || users.length === 0)) {
			return res.status(400).json({
				message: "User IDs are required for specific user promo",
			});
		}

		const promoCode = crypto.randomBytes(4).toString("hex").toUpperCase();

		const userObjectIds = Array.isArray(users)
			? users.map((userId: string) => new Types.ObjectId(userId))
			: [];

		const newPromo = await promo.create({
			promoCode,
			discountPercentage,
			expiryDate,
			allUsers,
			users: allUsers ? [] : userObjectIds,
		});

		res.status(201).json(newPromo);
	} catch (error) {
		res.status(500).json({ message: (error as any).message });
	}
};

export const checkPromo = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userid = req.headers.userid;

		if (!id) {
			return res.status(400).json({ message: "Promo code is required" });
		}

		const promoDoc = await promo.findOne({ promoCode: id });

		if (!promoDoc) {
			return res.status(404).json({ message: "Promo code not found" });
		}

		const currentDate = new Date();
		if (promoDoc.expiryDate < currentDate) {
			return res.status(400).json({ message: "Promo code has expired" });
		}

		if (!promoDoc.allUsers) {
			if (!userid) {
				return res.status(400).json({ message: "User ID is required" });
			}

			const userObjectId = new Types.ObjectId(
				Array.isArray(userid) ? userid[0] : userid,
			);
			const isUserAuthorized = promoDoc.users.some((user) =>
				user.equals(userObjectId),
			);

			if (!isUserAuthorized) {
				return res.status(403).json({
					message: "You are not authorized to use this promo code",
				});
			}
		}

		res.status(200).json({
			message: "Promo code is valid",
			promo: promoDoc,
		});
	} catch (error) {
		res.status(500).json({ message: (error as any).message });
	}
};

export const deletePromoByCode = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ message: "Promo code is required" });
		}

		const promoDoc = await promo.findOneAndDelete({ promoCode: id });

		if (!promoDoc) {
			return res.status(404).json({ message: "Promo code not found" });
		}

		res.status(200).json({ message: "Promo code deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: (error as any).message });
	}
};

export const listPromos = async (req: Request, res: Response) => {
	try {
		const promos = await promo.find();
		res.status(200).json(promos);
	} catch (error) {
		res.status(500).json({ message: (error as any).message });
	}
};
