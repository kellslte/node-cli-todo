import inquirer from 'inquirer'
import { Todo } from './../schema/Todo.schema.js';
import { connectToDatabase, disconnectFromDatabase } from '../database/connectdb.js';
import ora from 'ora'
import chalk from 'chalk'

export async function getTaskCode ()
{
    try {
        // prompt the user to enter the code for the task
        const response = await inquirer.prompt( [
            { name: 'code', message: 'Enter the code for the task', type: 'input' },
        ] )
        
        // remove whitespace from the response string
        response.code = response.code.trim();

        return response;
    } catch (e) {
        console.error(chalk.redBright('We ran into an error... \n'), e)
    }
}

export default async function deleteTask ()
{
    try {
        // get the code for the task
        const taskcode = await getTaskCode();

        // connect to the database
        await connectToDatabase();

        // start the spinner
        const spinner = ora( 'Finding and deleting the task...' ).start();

        // delete the task
        const response = await Todo.deleteOne( { code: taskcode.code } );

        // stop the spinner
        spinner.stop();

        if ( response.deletedCount === 0 ) console.error( chalk.redBright( 'A task with the code you entered does not exist so we could not delete any task for you. Please try again' ) );
        
        console.info( chalk.greenBright( 'Task deleted!' ) );

        // diconnect from the database
        await disconnectFromDatabase();
    } catch (e) {
        console.error( chalk.redBright( 'We ran into an error...' ), e );
        process.exit( 1 );
    }
}