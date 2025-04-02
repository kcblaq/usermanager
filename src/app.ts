import expres from "express";
import helmet from "helmet";
import cors from "cors";
import { connectDB } from "./config/dbconnect";
import router from "./routes/index";

const app = expres();
connectDB();

app.use(helmet());
app.use(cors());
app.use(expres.json());
app.use(expres.urlencoded({ extended: true }));
app.use('/api', router);

export default app;