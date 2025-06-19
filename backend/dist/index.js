import express from "express";
import dotenv from "dotenv";
import AuthRouter from './routes/Auth.routes.js';
import { errorHandler } from './middlewares/handleError.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import ActionPhoto from './routes/SaveRouter.routes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/", AuthRouter);
app.use("/", ActionPhoto);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
