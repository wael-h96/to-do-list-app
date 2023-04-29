# To-do List Application

This is a simple todo list SPA application built with the T3 stack architecture.
In this app, users can create a new task, update task, search according to task title and delete task.

## Technologies:

    - Nextjs 13 for the front-end side (Client side).
    - trpc - *a light library for building fully typesafe APIs*.
    - PostgreSql - *open source object-relational database*.
    - Prisma ORM - *a client query builder to interact with databases*.
    - Tailwind for styling.
    - Docker.

## In order to run the application, follow the instructions below:

    1. First thing first, clonse the repositroy using the following command:
        git clone https://github.com/wael-h96/to-do-list-app.git.

    2. Navigate to the project directory:
        cd todo-app.

    3. Run the following command:
        npm install.

    4. In the todo-app directory, run:
        docker compose up. ( *Two docker images will be generated (t3-app and postgres)* )
