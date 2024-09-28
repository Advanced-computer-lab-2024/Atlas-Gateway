import mongoose from "mongoose";

import { MONGO_DB } from "../Config/config";

const connectDB = async () => {
	await mongoose
		.connect(MONGO_DB.URI)
		.then(() => {
			console.log("Connected to MongoDB");
		})
		.catch((error) => {
			console.log("Error connecting to MongoDB");
			console.log(error);
		});
};

export default connectDB;
