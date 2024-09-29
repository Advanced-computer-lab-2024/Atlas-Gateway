import { Document } from "mongoose";

const filter = async (query: string, model: Document) => {
	const filter = JSON.parse(query);
};
