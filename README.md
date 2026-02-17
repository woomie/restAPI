## Expense & Income Tracker API
A RESTful API built with Node.js and Express for managing personal financial data, including income, expenses, and user accounts. Designed with a clean MVC architecture and Firebase Realtime Database for scalable data storage.


## Features
- Full CRUD operations for users, income, and expenses
- Firebase Realtime Database integration for persistent data    storage
- Clean MVC project structure with separated routes, controllers, and config
- Standard HTTP status codes and consistent error handling across all endpoints

## Tech Stack
- Runtime: Node.js
- Framework: Express.js
- Database: Firebase Realtime Database
- Architecture: RESTful MVC

## Getting Started
# Prerequisites
Before you begin, ensure you have the following installed:

- Node.js v14 or higher
- npm
- Firebase project with Realtime Database enabled

## Installation
- git clone https://github.com/woomie/restAPI
- cd restAPI
- npm install

## Start server
- nodemon index.js
- The API will be available at http://localhost:3000/

## API Endpoints

**USERS**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users | Get all users |
| GET | /users/:id | Get a single user |
| POST | /users | Create a new user |
| PUT | /users/:id | Update a user |
| DELETE | /users/:id | Delete a user |

**INCOME**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /income | Get all income |
| GET | /income/:id | Get a single income |
| POST | /income | Create a new income |
| PUT | /income/:id | Update an income |
| DELETE | /income/:id | Delete an income |

**EXPENSES**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /expenses | Get all expenses |
| GET | /expenses/:id | Get a single expense |
| POST | /expenses | Create a new expense |
| PUT | /expenses/:id | Update an expense |
| DELETE | /expenses/:id | Delete an expense |


## Error Handling
The API uses standard HTTP status codes to indicate the success or failure of requests:

- 200: Success
- 201: Resource created
- 400: Bad request
- 404: Resource not found
- 500: Server error

## Project Structure
restAPI/
├── config/
│   ├── config.js
│   └── restapi-1d162-firebase-adminsdk-fbsvc-dfd812bfb5.json
├── controllers/
│   ├── expensesController.js
|   ├── incomeController.js
|   └── userController.js
├── public/
│   ├── index.html
│   └── style.css
├── routes/
│   ├── expenses.js
|   ├── income.js
|   └── users.js
├── .env
├── .gitignore
├── package.json
└── index.js

## Contact
- Email: Wunmilawal24@gmail.com
- Project Link:https://github.com/woomie/restAPI