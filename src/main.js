#!/usr/bin/env node

// import all the handlers
import addTask from './commands/add-task.command.js';
import deleteTask from './commands/delete-task.command.js';
import readTask from './commands/read-task.command.js';
import updateTask from './commands/update-task.command.js';

// import the command class from commander
import { Command } from 'commander';


// create a class instance
const program = new Command();

// set the name and description of the command line tool
program
    .name( 'CLI Todos' )
    .description( 'A task manager that works with mongodb to keep track of your tasks' )
    .version( '1.0.0' );

// define the add task command
program
    .command( 'add' )
    .description( 'Create a new task' )
    .action( addTask );

// define the read tasks command
program
    .command( 'read' )
    .description( 'Get all your tasks' )
    .action( readTask );

// define the udpate task command
program
    .command( 'udpate' )
    .description( 'Update a task' )
    .action( updateTask );

// define the delete task command
program
    .command( 'delete' )
    .description( 'Delete a task' )
    .action( deleteTask );

// parse the command line arguments and execute the corresponding commands
program.parse();