import dotenv from "dotenv";

dotenv.config();

export const DEVELEOPMENT = process.env.NODE_ENV === "development";
export const TEST = process.env.NODE_ENV === "test";

export const SERVER = {
	host: process.env.SERVER_HOST ?? "localhost",
	port: 5000,
};

export const MONGO_DB = {
	host: process.env.MONGO_DB_HOST ?? "localhost",
	port: process.env.MONGO_DB_PORT ?? 27017,
	name: process.env.MONGO_DB_NAME ?? "test",
	user: process.env.MONGO_DB_USER ?? "",
	password: process.env.MONGO_DB_PASSWORD ?? "",
	URI:
		process.env.MONGO_DB_URI ??
		"mongodb+srv://atlasGateway:upLX1CCGmoG1RWP3@gateway.lyjp4.mongodb.net/?retryWrites=true&w=majority&appName=GateWay",
};
