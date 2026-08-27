# Rule-Based Content Filtering System
A full-stack content filtering application built with **React, Node.js/Express, and MySQL**.

## Requirements

Install:

* Git
* Node.js (v18+)
* npm
* MySQL Server
* MySQL Workbench (recommended)

## 1. Clone the Repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd "Rule-Based Content Filtering"

## 2. Database Setup

`2.1 Make sure MySQL is running.`

In MySQL Workbench, run these files in order:
migrations/001_create_rules.sql
migrations/002_create_rules.sql

`2.2 Verify the database in workbench:`
USE rule_based_content_filtering;
SELECT * FROM rules;

## 3. Backend Setup

`3.1 Open a terminal:`

cd backend
npm install

`3.2 Create backend/.env:`
Find in backend/.env.example
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=rule_based_content_filtering
DB_PORT=3306

`3.3 Put your MySQL password after DB_PASSWORD`

Start the backend:
npm run dev

`3.4 Test the connection in web browser:`

http://localhost:5000/api/health

Expected response:
{
  "status": "OK",
  "message": "Backend is running",
  "database": "Connected"
}

## 4. Frontend Setup

`4.1 Open another terminal:`

cd frontend
npm install
npm run dev

`4.2 Open the URL shown by Vite, usually:`
http://localhost:5173


## Features

* Create, edit, delete, and view filtering rules
* Enable/disable rules
* Rule priority
* Match types: `contains`, `exact`, `starts_with`, `ends_with`
* Actions: `highlight`, `tooltip`, `block`
* Test content against enabled rules in real time

## API Endpoints
GET: /api/health --> db check
GET: /api/rules --> get all rules
GET: /api/rules/:id --> get one rule
POST: /api/rules --> create a rule 
PUT: /api/rules/:id --> update a rule
DELETE/api/rules/:id --> delete a rule
POST: /api/filter/check --> test content against rules

## Troubleshooting
Database disconnected:
Check that MySQL is running and `backend/.env` contains the correct credentials.

rules table doesn't exist:
Run `database/schema.sql`.

No rules displayed:
Run `database/seed.sql`.

Frontend cannot connect:
Make sure the backend is running on port `5000`.

---
Fortesa Halitaj
Computer Science & Engineering, 2026
