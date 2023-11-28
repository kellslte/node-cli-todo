import inquirer from "inquirer";
import { Todo } from "./../schema/Todo.schema.js";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../database/connectdb.js";
import ora from "ora";
import chalk from "chalk";
import { getTaskCode } from './delete-task.command.js';

async function askUpdateQuestion ( todo )
{
    try {
        // prompt the user to update the todo information
        const updateResponse = await inquirer.prompt( [
            { name: 'name', message: 'Enter a new name for the todo?', type: 'input', default: todo.name },
            { name: 'description', message: 'Enter a new description for the todo?', type: 'input', default: todo.description },
            { name: 'status', message: 'Update the status of the todo?', type: 'list', choices: ['pending', 'completed'], default: todo.status }
        ] );

        return updateResponse;
    } catch (e) {
        console.error(chalk.redBright('We ran into an error... \n'), e)
    }
}

export default async function updateTask ()
{
    try {
        // get the coed for the todo
        const todocode = await getTaskCode();

        // connect to the database
        await connectToDatabase();

        // start the spinner
        const spinner = ora( 'Searching for the task...' ).start();
        
        // get the todo the user wants to update
        const todo = await Todo.findOne( { code: todocode.code } );

        // stop the spinner
        spinner.stop();

        if ( !todo ) console.error( chalk.redBright( 'We could not find a todo with a code that matches the one you specified.' ) )
        
        console.info( chalk.blueBright( 'Type in the provided space to update the properties else press Enter if you do not want to update the data' ) );

        // get the user's response for the data
        const updatedTodo = await askUpdateQuestion( todo );

        // if the user marks the todo as completed, we delete if from the records
        if ( updatedTodo.status === 'completed' )
        {
            // change the spinner text and restart it
            spinner.text = 'Deleting the todo...';
            spinner.start();

            // delete the todo from the records
            await Todo.deleteOne( { _id: todo._id } );

            // stop the spinner
            spinner.stop();
            console.info( chalk.bgGreenBright( 'The todo has been deleted!' ) );
        } else
        {
            // update the spinner text
            spinner.text = 'Updating the todo...';
            spinner.start();

            // update the todo records
            await Todo.updateOne( { _id: todo._id },
                updatedTodo, {
              runValidators: true,
            } );
            
            // stop the spinner
            spinner.stop();
            console.info( chalk.greenBright( 'The todo has been updated!' ) );
        }

        // disconnect from the database after all operations have completed
        await disconnectFromDatabase();
    } catch (e) {
        console.error( chalk.redBright( 'We ran into an error...' ), e );
        process.exit( 1 );
    }
}