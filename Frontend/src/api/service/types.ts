import { TUser, TTourist, TAdvetisor, TSeller, TTourGuide } from "@/types/global";

export type TRegisterationResponse = TUser & { _id: string };

export type TLoginResponse = TUser & { _id: string };

export type TTouristProfileResponse = TTourist & { _id: string };

export type TSellerProfileResponse = TSeller & { _id: string };

export type TAdvertisorProfileResponse = TAdvetisor & { _id: string };

export type TTourGuideProfileResponse = TTourGuide & { _id: string };


