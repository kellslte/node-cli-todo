import { config } from 'dotenv'
config();
import mongoose from 'mongoose'
import ora from 'ora'
import chalk from 'chalk'

export async function connectToDatabase ()
{
    try {
        const spinner = ora( 'Connecting to the database...' ).start();
        await mongoose.connect( process.env.MONGO_DB_URI );
        spinner.stop();
        console.info( chalk.greenBright( `🔊 Successfully connected to database!` ) );
    } catch (e) {
        console.error(chalk.redBright("☣️ Error connecting to database: ", e));
        process.exit( 1 );
    }
}

export async function disconnectFromDatabase ()
{
    try {
        await mongoose.disconnect();
        console.info( chalk.greenBright( '📢 Disconnected from database' ) );
    } catch (e) {
        console.error(
          chalk.redBright("☣️ Error disconnecting from database: ", e)
        );
        process.exit( 1 );
    }
}