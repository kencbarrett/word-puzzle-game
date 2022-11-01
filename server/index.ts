import express, { Application } from "express";
import * as mongoose from "mongoose";
import { gameServiceRouter } from "./routes";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const mongodbURI = process.env['ATLAS_URI'];
const port = process.env['PORT'];
const app: Application = express();

if (!mongodbURI) {
    console.error("No MongoDB environment variable has been defined");
    process.exit(1);
 }

// set up mongodb
mongoose
    .connect(mongodbURI)
    .then((x) => {
        console.log(`Connected to MongoDB Atlas!  Database name "${x.connections[0].name}`);
    })
    .catch((err) => {
        console.log(`Error connecting to MongoDB Atlas`, err.reason);
    });

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//app.use(express.static(path.join(__dirname, 'dist/angular-mean-crud-tutorial')))
app.use('/api/', gameServiceRouter);

// start listening
app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
});
// 404 Handler
// app.use((req, res, next) => {
//     next(createError(404))
//   })
// Base Route
app.get('/', (req, res) => {
res.send('invaild endpoint')
});

// app.get('*', (req, res) => {
// res.sendFile(
//     path.join(__dirname, 'dist/angular-mean-crud-tutorial/index.html'),
// )
// });
