import express from "express";
import * as dotenv from "dotenv";
import { connectToDatabase } from "./database";
import { wordServiceRouter } from "./routes/wordService.routes";
import { statsServiceRouter } from "./routes/statsService.route";

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
 
const mongodbURI = process.env['ATLAS_URI'];
const port = process.env['PORT'];
 
if (!mongodbURI) {
   console.error("No MongoDB environment variable has been defined");
   process.exit(1);
}

connectToDatabase(mongodbURI)
   .then(() => {
    const app = express();
    
    app.use('/wordService', wordServiceRouter)
    app.use('/statsService', statsServiceRouter)
    app.listen(port, () => {
      console.log(`Game API is running on port ${port}.`);
    });
   })
   .catch(error => console.error(error));