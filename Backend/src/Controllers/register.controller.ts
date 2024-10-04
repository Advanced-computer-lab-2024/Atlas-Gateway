import { Request, Response } from "express";
import { Advertiser } from "../Database/Models/Users/advertiser.model";
import { Governor } from "../Database/Models/Users/governor.model";
import { Seller } from "../Database/Models/Users/seller.model";
import { TourGuide } from "../Database/Models/Users/tourGuide.model";
import { Tourist } from "../Database/Models/Users/tourist.model";


export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password, type,  mobileNumber, nationality,dob,job } =
            req.body; 
        

        if (!username || !email || !password) {
			res.status(400).send("username, email and password are required");
		}
        let user;
        switch (type) {
            case 'tourist':
                if (!mobileNumber || !nationality || !dob || job) {
                    res.status(400).send("mobileNumber, nationality ,job and dob are required");
                }
                user = new Tourist({
                    username,
                    email,
                    password,
                    mobileNumber, nationality,dob,job 
                }); break;
            case 'governer':
                    user = new Governor({
                        username,
                        email,
                        password,
                    }); break;
            case 'tour_guide':
                user = new TourGuide({
                    username,
                    email,
                    password,
                });
                break;
            case 'seller':
                user = new Seller({
                    username,
                    email,
                    password,
                });
                break;
            case 'advertiser':
                user = new Advertiser({
                    username,
                    email,
                    password,
                });
                break;
            default:
                user = new Tourist({
                    username,
                    email,
                    password,
                    mobileNumber, 
                    nationality,
                    dob,
                    job 
                });
                break;
        }


        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};