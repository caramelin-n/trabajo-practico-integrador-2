import chalk from "chalk";
import express from "express";
import dotenv from "dotenv";
import db from "./src/config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, async () => {
    await db();
    console.log(chalk.greenBright(`Servidor corriendo en el puerto ${port}`));
});