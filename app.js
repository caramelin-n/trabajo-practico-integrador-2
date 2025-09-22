import chalk from "chalk";
import express from "express";
import dotenv from "dotenv";
import db from "./src/config/db.js";
import allRouter from "./src/routes/all.routes.js";
import cors from "cors"
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());
app.use(cors("*"));
app.use("/api", allRouter);

app.listen(port, async () => {
    await db();
    console.log(chalk.greenBright(`Servidor corriendo en el puerto ${port}`));
});