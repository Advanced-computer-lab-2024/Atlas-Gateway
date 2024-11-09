import Amadeus from "amadeus";
import dotenv from "dotenv";

dotenv.config();

const amadeus = new Amadeus({
	clientId: process.env.AMADEUS_CLIENT_ID!,
	clientSecret: process.env.AMADEUS_CLIENT_SECRET!,
});

export default amadeus;
