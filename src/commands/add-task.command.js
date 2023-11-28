import inquirer from 'inquirer'
import { connectToDatabase, disconnectFromDatabase } from '../database/connectdb.js';
import ora from 'ora'
import chalk from 'chalk'
import { Todo } from './../schema/Todo.schema.js';

async function input ()
{
    const answers = await inquirer.prompt( [
        { name: 'name', message: 'Enter the name of the task', type: 'input' },
        { name: 'detail', message: 'Enter the detais for the task', type: 'input' }
    ] );

    return answers;
}

const askQuestions = async () =>
{
    const todos = [];
    let loop = false;

    do
    {
        const response = await input()
        todos.push( response );
        const confirm = await inquirer.prompt( [
            { name: 'answer', message: 'Do you want to add more tasks?', type: 'confirm'}
        ] );
        if(confirm.answer) loop = true;
     }
    while ( loop )
    
    return todos;
}


export default async function addTask ()
{
    try {
        // collect the response from the user
        const responses = await askQuestions();

        // connect to the database
        await connectToDatabase();

        // show the spinner just before you store the response in the database
        let spinner = ora('Creating the todos...').start();

        // loop through the responses and store them in the database
        for ( let i = 0; i < responses.length; i++ )
        { 
            const response = responses[ i ];
            await Todo.create( response );
        }

        // Stop the spinner and display a success message
        spinner.stop();
        console.info( chalk.greenBright( 'Todos has been created successfully!' ) );

        // sever the connection to the database after the operation is complete
        await disconnectFromDatabase();
    } catch (e) {
        console.error( chalk.redBright( 'We ran into an error while saving your todos... ' ), e );
        process.exit( 1 );
    }
}