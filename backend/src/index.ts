import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./routes/Auth.routes";
import { errorHandler } from "./middlewares/handleError";
import cookieParser from "cookie-parser";
import cors from "cors"
import ActionPhoto from "./routes/SaveRouter.routes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "https://media-galery-app.vercel.app", 
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


app.use("/", AuthRouter)
app.use("/", ActionPhoto)


app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
