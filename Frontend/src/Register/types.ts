import { EAccountType } from "@/types/enums";


export type TRegisterForm = {
	email: string;
	password: string;
	confirmPassword: string;
	username: string;
	type: EAccountType;
	dob?: string;
	mobileNumber?: string;
	occupation?: string;
	nationality?: string;
};

export const accountTypeArray = [
	EAccountType.Tourist,
	EAccountType.Guide,
	EAccountType.Seller,
	EAccountType.Advertiser,
];