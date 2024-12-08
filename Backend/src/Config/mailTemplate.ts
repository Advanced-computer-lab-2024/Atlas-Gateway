export const otpTemplate = (otp: string) => {
	return `
				<!DOCTYPE html>
				<html lang="en">
				<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>Password Reset</title>
						<style>
								body {
										font-family: Arial, sans-serif;
										background-color: #f4f4f4;
										margin: 0;
										padding: 0;
								}
								.email-container {
										max-width: 600px;
										margin: 20px auto;
										background: #ffffff;
										border: 1px solid #dddddd;
										border-radius: 8px;
										overflow: hidden;
								}
								.email-header {
										background-color: #007bff;
										color: #ffffff;
										text-align: center;
										padding: 15px;
								}
								.email-body {
										padding: 20px;
										color: #333333;
								}
								.otp-box {
										text-align: center;
										margin: 20px 0;
										font-size: 24px;
										font-weight: bold;
										color: #007bff;
										background: #f4f9ff;
										padding: 15px;
										border-radius: 5px;
										border: 1px solid #d4e7ff;
										display: inline-block;
								}
								.email-footer {
										text-align: center;
										font-size: 12px;
										color: #888888;
										padding: 10px 20px;
										background: #f9f9f9;
								}
								a {
										color: #007bff;
										text-decoration: none;
								}
						</style>
				</head>
				<body>
						<div class="email-container">
								<div class="email-header">
										<h1>Password Reset Request</h1>
								</div>
								<div class="email-body">
										<p>Dear User,</p>
										<p>We received a request to reset the password for your account associated with this email. Use the OTP below to reset your password:</p>
										<div class="otp-box">${otp}</div>
										<p>If you did not request this password reset, please ignore this email. Your account remains secure.</p>
										<p>If you need further assistance, feel free to contact our <a href="mailto:${process.env.SYSTEM_EMAIL}">support team</a>.</p>
								</div>
								<div class="email-footer">
										<p>&copy; 2024 AtlasGateway. All rights reserved.</p>
								</div>
						</div>
				</body>
				</html>
		`;
};

export const receiptTemplate = (amount: Number) => {
	return `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 5px;
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
            color: #333;
        }
        .content h2 {
            color: #4CAF50;
            font-size: 20px;
        }
        .receipt {
            border: 1px solid #ddd;
            margin-top: 20px;
            padding: 10px;
            border-radius: 5px;
            background-color: #f8f8f8;
        }
        .footer {
            text-align: center;
            padding: 10px;
            background-color: #f1f1f1;
            color: #555;
            font-size: 12px;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            Payment Receipt
        </div>
        <div class="content">
            <p>Hi,</p>
            <p>Thank you for your payment! Here are the details of your transaction:</p>
            <div class="receipt">
                <p><strong>Amount:</strong> ${amount}</p>
                <p><strong>Payment Method:</strong> Credit Card (**** **** **** 4242)</p>
            </div>
            <p>If you have any questions about this receipt, feel free to contact our support team.</p>
            <p>Thank you for choosing AtlasGateway.</p>
            <p>Best regards,</p>
            <p>AtlasGateway</p>
        </div>
        <div class="footer">
            &copy; 2024 AtlasGateway. All rights reserved. <br>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </div>
    </div>
</body>
</html>
`;
};

export const promoCodeTemplate = (
	promoCode: string,
	discount: number,
	expirationDate: Date,
) => {
	return `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 5px;
            overflow: hidden;
        }
        .header {
            background-color: #FF5722;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
            color: #333;
        }
        .content h2 {
            color: #FF5722;
            font-size: 20px;
        }
        .promo {
            border: 1px dashed #FF5722;
            margin-top: 20px;
            padding: 15px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: #FF5722;
            background-color: #FFF3E0;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            background-color: #f1f1f1;
            color: #555;
            font-size: 12px;
        }
        .footer a {
            color: #FF5722;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            Exclusive Promo Code Just for You!
        </div>
        <div class="content">
            <p>Hi,</p>
            <p>We have a special offer just for you! Use the promo code below to enjoy a discount on your next purchase:</p>
            <div class="promo">
                ${promoCode}
            </div>
            <p><strong>Discount:</strong> ${discount}%</p>
            <p><strong>Expires on:</strong> ${expirationDate}</p>
            <p>Don't wait too long—this offer won't last forever!</p>
            <p>Happy shopping,</p>
            <p>The AtlasGateway Team</p>
        </div>
        <div class="footer">
            &copy; 2024 AtlasGateway. All rights reserved. <br>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </div>
    </div>
</body>
</html>
`;
};
