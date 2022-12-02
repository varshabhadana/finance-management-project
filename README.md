# Hisaab

## Description

Hisaab is a Full stack web application which will help you manage your finance by adding your daily income and expenses. User can visualise data with the help of graphs and can also subscribe for daily email reminder.

Visit the deployed site of **Hisaab** [here](https://finance-management-project.fly.dev/).

## Technologies used
- Next.js
- Typescript
- React
- PostgreSQL
- Node.js
- Emotion
- Tailwind CSS
- REST API
- Google API 
- Recharts
- Nodemailer
- Nodecron
- Figma
- DrawSQL
- Jest
- Playwright
- Fly.io

## Features

- Authentication: registration and login 
- Logout
- User can choose an avatar and subscribe for email reminder.
- Add entry for Income and Expense by selecting Category, add amount, date and description. 
   - User can also create their own category
- Filter: User can filter the transaction by selecting date or for last week and last month. 
- User can edit and delete the transaction amount from the list.
- User can analyze their transaction with bar graph, pie-chart and line chart for last week and last year.
- User will get a daily email reminder to fill their income and expenses.
- User can view their personal information on user profile page.
- User can update the email reminder on settings page.

## Screenshots
### Landing Page
![Screenshot 2022-11-28 002949](https://user-images.githubusercontent.com/106388649/204165736-ce938048-bc41-4b99-a490-7797bbfdda84.png)
### Profile Setup
![Screenshot 2022-11-28 004016](https://user-images.githubusercontent.com/106388649/204165949-98281618-9362-4adf-bf01-c650ec028422.png)
### Transaction Page
![Screenshot 2022-11-28 004203](https://user-images.githubusercontent.com/106388649/204166057-a6b9122e-b1f4-4be5-850a-0da4c6e96795.png)
### Add Transaction
![Screenshot 2022-11-28 010055](https://user-images.githubusercontent.com/106388649/204167060-ad54bb01-6c7b-4311-ab19-e8cf5ef9fb95.png)
### Create New Category
![Screenshot 2022-11-28 010324](https://user-images.githubusercontent.com/106388649/204167092-8e655337-5371-44dd-9019-ccf48d20463b.png)
### Filter Transaction
![Screenshot 2022-11-28 010756](https://user-images.githubusercontent.com/106388649/204167326-309ec1da-2904-4fad-a3e3-915bd70d4c20.png)

### Analyze
![Screenshot 2022-11-28 010159](https://user-images.githubusercontent.com/106388649/204167121-42621269-b560-4150-adb5-3cc624b5b545.png)

## Database Schema in DrwaSQL
![Screenshot 2022-11-28 004638](https://user-images.githubusercontent.com/106388649/204166292-e9f7767f-d3c7-425c-8115-bfee6fcd0a83.png)
## Wireframing in [Figma](https://www.figma.com/file/hF3RqGeVFdAsVkk2henjps/Untitled?node-id=0%3A1&t=lqXIs4PSAURWPlqe-1)
![Screenshot 2022-11-28 005053](https://user-images.githubusercontent.com/106388649/204166418-8cfc0a26-19c0-45cf-98e4-2f0501155c91.png)


## Setup instructions

- Clone the repository with `git clone <repo>`
- Setup the database by downloading and installing PostgreSQL
- Create a user and a database
- Create a new file .env
- Create OAuth 2.0 API Credential and store it in your .env with a variable name CLIENTID, CLIENTSECRET, REFRESHTOKEN
- Copy the environment variables from .env-example into .env
- Replace the placeholders xxxxx with your username, password and name of database
- Install dotenv-cli with `yarn add dotenv-cli`
- Run `yarn install` in your command line
- Run the migrations with `yarn migrate up`
- Start the server by running `yarn dev`

## Deploy on fly.io

- Generate a Fly.io Token, called _GitHub Actions Deploy Token_ and copy the text
- Create a new repository secret in the GitHub repo, named FLY_API_TOKEN
- Log into Fly.io on the command line: `flyctl auth login`
- Create an app `flyctl apps create --name <app name>`
- Create the Fly.io config files
- Add database credentials using Fly.io secrets
  `flyctl secrets set PGHOST=localhost PGDATABASE=$(openssl rand -hex 16) PGUSERNAME=upleveled$(openssl rand -hex 16) PGPASSWORD=$(openssl rand -base64 32)`
- Create a 1GB volume for the PostgreSQL database in Frankfurt
  `flyctl volumes create postgres --size 1 --region fra`
- Deploy: `flyctl deploy`

