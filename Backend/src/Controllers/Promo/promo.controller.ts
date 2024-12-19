import { Request, Response } from "express";
import { Types } from "mongoose";

import { promo } from "../../Models/Promo/promo.model";
import {
	checkPromoService,
	createPromoService,
	deletePromoByCodeService,
} from "../../Services/Promo/promo.service";

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
		const newPromo = await createPromoService(
			expiryDate,
			discountPercentage,
			allUsers,
			users,
		);

		res.status(201).json(newPromo);
	} catch (error) {
		res.status(500).json({ message: (error as any).message });
	}
};

export const checkPromo = async (req: Request, res: Response) => {
	try {
		const promoCode = req.params.promoCode;
		const userid = req.headers.userid;

		if (!promoCode) {
			return res.status(400).json({ message: "Promo code is required" });
		}

		const promoDoc = await checkPromoService(promoCode, userid);

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
		const { PromoCode } = req.params;

		res.status(200).json(await deletePromoByCodeService(PromoCode));
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
