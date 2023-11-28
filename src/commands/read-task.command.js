import { connectToDatabase, disconnectFromDatabase } from '../database/connectdb.js';
import { Todo } from './../schema/Todo.schema.js';
import chalk from 'chalk';
import ora from 'ora';

export default async function readTask ()
{
    try {
        // establish connection to the database
        await connectToDatabase();

        // start the spinner
        const spinner = ora( 'Fetching tasks...' );
        
        // fetch the tasks from the database
        const todos = await Todo.find();

        // stop the spinner
        spinner.stop();

        if ( todos.length === 0 ) console.error( chalk.blueBright( 'You do not have any tasks yet.' ) );
        
       todos.forEach( todo =>
        {
            console.info(
                chalk.cyanBright(`Todo Code: ${todo.code} \n` ),
                chalk.blueBright(`Name: ${todo.name} \n` ),
                chalk.yellowBright(`Description ${todo.detail} \n`)
            )
        } )

        // display the result in a table
        // console.table(todosrecord, [
        //   chalk.bgCyanBright("code"),
        //   chalk.bgBlueBright("name"),
        //   chalk.bgYellowBright("description"),
        // ]);
        
        // disconnect from the database
        await disconnectFromDatabase();
    } catch (e) {
        console.error( chalk.redBright( 'Oops that is an error: ' ), e );
        process.exit( 1 );
    }
}
