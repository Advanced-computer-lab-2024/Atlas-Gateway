import nodemailer from "nodemailer";

import * as mailTemplate from "../Config/mailTemplate";

export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: `${process.env.SYSTEM_EMAIL}`,
		pass: `${process.env.SYSTEM_EMAIL_APP_PASSWORD}`,
	},
});

export const sendPaymentMail = async (
	email: string,
	amount: number,
	paymentType: string,
) => {
	await transporter.sendMail({
		from: `${process.env.SYSTEM_EMAIL}`,
		to: `${email}`,
		subject: "Payment Receipt",
		html: mailTemplate.receiptTemplate(amount / 100, paymentType),
	});
};

export const sendPasswordResetMail = async (email: string, otp: string) => {
	await transporter.sendMail({
		from: `${process.env.SYSTEM_EMAIL}`,
		to: `${email}`,
		subject: "Reset Your Password",
		html: mailTemplate.otpTemplate(otp),
	});
};

export const sendPromoCode = async (
	email: string,
	promoCode: string,
	discount: number,
	expirationDate: Date,
) => {
	await transporter.sendMail({
		from: `${process.env.SYSTEM_EMAIL}`,
		to: `${email}`,
		subject: "Promo Code",
		html: mailTemplate.promoCodeTemplate(
			promoCode,
			discount,
			expirationDate,
		),
	});
};

export const sendItineraryFlaggedMail = async (
	itineraryTitle: string,
	email: string,
) => {
	await transporter.sendMail({
		from: `${process.env.SYSTEM_EMAIL}`,
		to: `${email}`,
		subject: "Itinerary Flagged",
		html: mailTemplate.itineraryFlaggedTemplate(itineraryTitle),
	});
};

export const sendProductOutOfStockMail = async (
	productName: string,
	email: string,
) => {
	await transporter.sendMail({
		from: `${process.env.SYSTEM_EMAIL}`,
		to: `${email}`,
		subject: "Product Out of Stock",
		html: mailTemplate.productOutOfStockTemplate(productName),
	});
};

export const sendItineraryStartedBookingsMail = async (
	title: string,
	pickUpLocation: string,
	dropOffLocation: string,
	startDateTime: Date,
	email: string,
) => {
	await transporter.sendMail({
		from: `${process.env.SYSTEM_EMAIL}`,
		to: `${email}`,
		subject: "Upcoming Booked Event",
		html: mailTemplate.itineraryBookingsTemplate(
			title,
			pickUpLocation,
			dropOffLocation,
			startDateTime,
		),
	});
};
