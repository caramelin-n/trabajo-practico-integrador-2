import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from "dotenv"

dotenv.config();

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        // await mongoose.connection.dropDatabase;
        console.log(chalk.greenBright("Servidor conectado a la base de datos."));
    } catch (error) {
        console.log(chalk.redBright("Error al conectar el servidor."));
        console.error(chalk.redBright(error));
    }
}

export default db;