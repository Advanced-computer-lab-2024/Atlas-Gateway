import { Document } from "mongoose";


const filter = async (query: string, model: Document) => {
    const filter = JSON.parse(query);
    const data = await model
        .find(filter)
        .exec();
    return data;
}