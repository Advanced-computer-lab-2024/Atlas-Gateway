import express from 'express';
import { SERVER } from './Config/config';
import connectDB from './Database/db';
import { Types } from 'mongoose';
import { Activity } from './Database/Models/activity.model';

const app = express();


async function startServer() {

    app.use(express.json());
    app.listen(SERVER.port, () => {
        console.log(`Server is running on http://${SERVER.host}:${SERVER.port}`);
    });
}

connectDB();
startServer();
