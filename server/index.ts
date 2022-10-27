import express, { Application, Request, Response } from "express";
import * as mongoose from "mongoose";
import { gameServiceRouter } from "./routes";
import dotenv from "dotenv";

dotenv.config();

const mongodbURI = process.env['ATLAS_URI'];
const port = process.env['PORT'];
const app: Application = express();

if (!mongodbURI) {
    console.error("No MongoDB environment variable has been defined");
    process.exit(1);
 }

// set up mongodb
mongoose.connect(mongodbURI);
const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', gameServiceRouter);

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}