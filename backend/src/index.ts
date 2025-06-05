  import express from "express";
  import dotenv from "dotenv";
  import AuthRouter from "./routes/Auth.routes";
  import { errorHandler } from "./middlewares/handleError";
  import SaveRouter from "./routes/SaveRouter.routes";
  import cookieParser from "cookie-parser";
  import ActionPhoto from "./routes/SaveRouter.routes";
  import cors from "cors"
  dotenv.config();

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());


  app.use("/", AuthRouter)
  app.use("/", SaveRouter)
  app.use("/", ActionPhoto)


  app.use(errorHandler)
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
