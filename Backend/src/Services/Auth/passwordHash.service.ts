import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password1: string, password2: string) => {
	return await bcrypt.compare(password1, password2);
};
