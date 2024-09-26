import mongoose from 'mongoose';
import {MONGO_DB} from '../Config/config'

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://${MONGO_DB.host}:${MONGO_DB.port}/${MONGO_DB.name}`);
        console.log(`MongoDB Connected: ${MONGO_DB.host} on Port ${MONGO_DB.port}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
};

export default connectDB;