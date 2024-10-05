export type TUser = {
	id: string;
    username: string;
    type: string;
};
export interface TTourist extends TUser {
    name: string;
    email: string;
    mobileNumber: string;
    walletBalance: number;
}



