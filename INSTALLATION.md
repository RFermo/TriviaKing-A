# Installation

[![node version][node-image]][node-url] [![npm version][npm-image]][npm-url] [![mysql version][mysql-image]][mysql-url]

Trivia King uses ReactJS (frontend), ExpressJS (backend), and MySQL.

## Prerequisites
- `npm`
- `Node.js`
- `MySQL Version 8`

## Install
### Download files
```bash
git clone https://github.com/RFermo/TriviaKing-A
```

### Install node modules
The frontend and backend are split into the client (frontend) and server (backend) directories.
```bash
| TriviaKing-A
    |__ client
    |__ server
```

Open a terminal in the directory that Trivia King was cloned into and run the following:

```bash
cd ./client && npm install && cd ../server && npm install
```

### Install MySQL
Download and install MySQL for your operating system at [MySQL][mysql-install-url] website.

## Setup Database
### Create and import database
Create an empty database as found [here][mysql-create-database] and import the initial database using this [sql file][mysql-init-db].

Creating and importing the database can be done via the command line:
```bash
mysql -u root -p -e "CREATE DATABASE trivia_king"
mysql -u root -p trivia_king < ./server/db/trivia_king.sql
```

### Create user and grant permissions
Create a MySQL user as found [here][mysql-create-user] and don't forget to [grant privileges][mysql-grant-privileges] to the new MySQL user.

### Update database configuration file
Update the database configuration file to use the database and MySQL user/password that you have created.

Database configuration file:
[./server/db/connect.js][mysql-config-file]

### Start both the client and server
Both client and server use `npm start`.
```bash
cd ./TriviaKing-A/client && npm start
cd ./TriviaKing-A/server && npm start
```

[node-url]: https://nodejs.org/en/download/
[node-image]: https://badgen.net/npm/node/next

[npm-image]: https://badgen.net/npm/v/express
[npm-url]:https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

[mysql-image]: https://badgen.net/badge/mysql/v8/yellow
[mysql-url]:https://dev.mysql.com/downloads/mysql/
[mysql-windows-install-url]: https://dev.mysql.com/downloads/windows/installer/8.0.html
[mysql-install-url]: https://dev.mysql.com/downloads/mysql/
[mysql-create-database]: https://dev.mysql.com/doc/mysql-getting-started/en/

[mysql-config-file]: https://github.com/RFermo/TriviaKing-A/tree/main/server/db/connect.js
[mysql-init-db]: https://github.com/RFermo/TriviaKing-A/tree/main/server/db/trivia_king.sql
[mysql-create-user]: https://dev.mysql.com/doc/refman/8.0/en/create-user.html#create-user-overview
[mysql-grant-privileges]: https://dev.mysql.com/doc/refman/8.0/en/create-user.html#create-user-role
