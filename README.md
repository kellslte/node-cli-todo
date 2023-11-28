
# Node CLI Task Manager

This tool is a simple task manager built with node js using the commander library and a few other helper libraries. 


## Features

- View all existing tasks
- Create tasks
- Update a task
- Delete a task


## Installation

To get started, install the project from npm

```bash
  cd node-cli-todo
```
    
```bash
  cd node-cli-todo
```

Make sure you have pnpm installed on your machine or you can use npm

```bash
    pnpm i
```

Then create a .env file to put your mongoose database connection string 

```bash
  cp .env.example .env  
```

Update the .env file and install the project gobally

```bash
  npm i -g .
```

You can now test out the project to view available commands

```bash
  todo -h
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_DB_URI`

When you copy the .env.example file already in the project, this variable will already be there, so just put your mongodb connection string there and you will be good to go.


## Feedback

If you have any feedback, please reach out to me at maxotif@gmail.com.




## Acknowledgements

 - [How to Build a Task Manager CLI Tool with Node.js](https://www.freecodecamp.org/news/nodejs-tutorial-build-a-task-manager-cli-tool/)
