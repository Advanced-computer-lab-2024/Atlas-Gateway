import crypto from "crypto";
import { Types } from "mongoose";

import transporter from "../../Config/mail";
import * as mailTemplate from "../../Config/mailTemplate";
import { promo } from "../../Models/Promo/promo.model";
import { findUserByUsername } from "../../Services/Auth/username.service";

export const createPromoService = async (
	expiryDate: string,
	discountPercentage: number,
	allUsers: boolean,
	users: any,
) => {
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
	return newPromo;
};

export const isBirthdayToday = (data: { user: any; type: string }): boolean => {
	const { user, type } = data;

	if (type !== "tourist") {
		return false;
	}

	const today = new Date();
	const dobDate = new Date(user.dob);

	const todayMonth = today.getUTCMonth();
	const todayDay = today.getUTCDate();
	const dobMonth = dobDate.getUTCMonth();
	const dobDay = dobDate.getUTCDate();

	return todayMonth === dobMonth && todayDay === dobDay;
};

export const createBirthdayPromo = async (username: string, email: string) => {
	const userResult = await findUserByUsername(username);

	if (!userResult || !userResult.user) {
		return { message: "User not found" };
	}
	const { user, type } = userResult;

	const isBirthday = isBirthdayToday({ user, type });

	if (!isBirthday) {
		return { message: "None" };
	}

	const existingPromos = await promo.find({ users: user._id });

	if (existingPromos.length > 0) {
		return { message: "User already has promos" };
	}

	const expiryDate = new Date();
	expiryDate.setDate(expiryDate.getDate() + 2);

	const discountPercentage = 10;

	const newPromo = await createPromoService(
		expiryDate.toISOString(),
		discountPercentage,
		false,
		[user._id],
	);

	await transporter.sendMail({
		from: `${process.env.SYSTEM_EMAIL}`,
		to: `${email}`,
		subject: "Happy Birthday Promo",
		html: mailTemplate.promoCodeTemplate(
			newPromo.promoCode,
			newPromo.discountPercentage,
			newPromo.expiryDate,
		),
	});

	return newPromo;
};
