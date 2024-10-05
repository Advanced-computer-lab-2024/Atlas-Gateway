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

export interface TSeller extends TUser {
    companyName: string;
    email: string;
    description: string;
}

export interface TAdvetisor extends TUser {
    companyName: string;
    email: string;
    hotline: number;
    website: string;
    description: string;
}



