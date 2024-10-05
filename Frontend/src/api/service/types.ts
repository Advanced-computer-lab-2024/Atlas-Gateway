import { TUser, TTourist } from "@/types/global";

export type TRegisterationResponse = TUser & { _id: string };

export type TLoginResponse = TUser & { _id: string };

export type TProfileResponse = TTourist & { _id: string };
