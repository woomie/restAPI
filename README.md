## Overview
This API allows users to manage their expenses and income in a system. It supports basic CRUD (Create, Read, Update, Delete) operations for both income and expense records. The API is designed to handle user data related to financial tracking, including savings, payment obligations, and housing expenses.

## Features
-**Backend:** Node.js with Express, providing restful API for managing expenses and income
- **Database:** Firebase for managing data storage

## Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14 or higher)
npm (Node Package Manager)
Firebase project set up with Realtime Database

## Installation
git clone https://github.com/woomie/restAPI
cd restAPI
npm install

## Start server
nodemon index.js
The API will be available at http://localhost:4000/

## API Endpoints

-**USERS**
GET /users - Get all users
GET /users/:id - Get a single user
POST /users - Create a new user
PUT /users/:id - Update a user
DELETE /users/:id - Delete a user

-**INCOME**
GET /income - Get all income
GET /income/:id - Get a single income
POST /income - Create a new income
PUT /income/:id - Update an income
DELETE /income/:id - Delete an income

-**EXPENSES**
GET /expenses - Get all expenses
GET /expenses/:id - Get a single expense
POST /expenses - Create a new expense
PUT /expenses/:id - Update an expense
DELETE /expenses/:id - Delete an expense


## Error Handling
The API uses standard HTTP status codes to indicate the success or failure of requests:

200: Success
201: Resource created
400: Bad request
404: Resource not found
500: Server error

## Project Structure
restAPI/
├── config/
│   ├── config.js
│   └── restapi-1d162-firebase-adminsdk-fbsvc-dfd812bfb5.json.
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
|   └── user.js
├── .env
├── .gitignore
├── package.json
└── index.js

## Contact
Email: Wunmilawal24@gmail.com
Project Link:https://github.com/woomie/restAPI