import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, 10);
};
