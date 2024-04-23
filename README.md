# Tudo Web
Tudo is a simple web application for managing tasks. It allows users to sign in, sign up, add, edit, and delete tasks. The application provides a clean and intuitive interface for managing daily tasks effectively.

## Features
- User authentication: Users can sign up for a new account or sign in with existing credentials.
- Task management: Users can add, edit, and delete tasks.

## Technologies Used
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Next.js
- **Database**: MongoDB

## Getting Started
To run the Tudo web app locally, follow these steps:

1. Clone the repository: `git clone https://github.com/keshavk4/tudo-web`
2. Navigate to the project directory: `cd tudo-web`
3. Install dependencies: `npm install`
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Define the following environment variables:
     ```
     MONGODB_URI=<your-mongodb-uri>
     ```
5. Start the development server: `npm run dev`
6. Access the application at `http://localhost:3000` in your web browser.

### Docker
The official [tudo-web docker image](https://hub.docker.com/r/keshav562/tudo-web) `keshav562/tudo-web` is available on Docker Hub.
