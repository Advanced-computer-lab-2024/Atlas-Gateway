import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: `${process.env.SYSTEM_EMAIL}`,
		pass: `${process.env.SYSTEM_EMAIL_APP_PASSWORD}`,
	},
});

export default transporter;
