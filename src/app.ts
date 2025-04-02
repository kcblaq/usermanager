import express from "express";
import helmet from "helmet";
import cors from "cors";
import { connectDB } from "./config/dbconnect";
import router from "./routes/index";
import errorHandler from "./middleware/errorHandler";

const app = express();
connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);


// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
	errorHandler(err, req, res, next);
});

export default app;