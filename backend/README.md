# Journiq – Backend Setup Guide

Follow these steps to set up and run the Journiq backend on your local machine after cloning the repository.

## 1. Prerequisites

Make sure you have installed:

- [Node.js (LTS)](https://nodejs.org/)
- npm (comes with Node.js)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

Verify your installations:

```bash
node -v
npm -v
git --version
```

## 2. Clone the Repository

Open a terminal and navigate to the directory where you want to store the project.

```bash
git clone <REPOSITORY_URL>
```

Navigate into the project:

```bash
cd <REPOSITORY_FOLDER>
```

## 3. Switch to the develop Branch

```bash
git checkout develop
git pull origin develop
```

## 4. Navigate to the Backend Directory

```bash
cd backend
```

## 5. Install Dependencies

Install the dependencies listed in `package.json`:

```bash
npm install
```

This installs the required packages, including Express, CORS, Helmet, dotenv, and Nodemon.

## 6. Configure Environment Variables

Inside the `backend` directory, create a `.env` file.

Add the following configuration:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
```

**Important:**

- Do not commit the `.env` file to GitHub.
- Use `.env.example` as a reference.
- If additional environment variables are introduced later, coordinate with the team before adding them.

## 7. Run the Backend

Start the development server:

```bash
npm run dev
```

You should see a message similar to:

```text
Journiq API running on port 5000
```

## 8. Verify the Backend

Open your browser and visit:

http://localhost:5000/

Expected response:

```json
{
  "message": "Journiq API is running!"
}
```

If you receive this response, the backend is running successfully.

## 9. Useful Commands

| Command       | Purpose                      |
| ------------- | ---------------------------- |
| `npm install` | Install dependencies         |
| `npm run dev` | Start development server     |
| `npm start`   | Start server without Nodemon |
| `node -v`     | Check Node.js version        |
| `npm -v`      | Check npm version            |

## 10. Troubleshooting

**Problem: `npm` is not recognized**

Install Node.js and restart your terminal.

**Problem: Port 5000 is already in use**

Stop the other process using that port or change the `PORT` value in `.env`.

**Problem: Missing environment variables**

Check that your `.env` file exists inside the `backend` directory and contains the required values.

**Problem: Dependencies are missing**

Run:

```bash
npm install
```

---

**Setup complete!** You are ready to work on the Journiq backend locally.

Before starting development, make sure you are working on your own feature branch and have pulled the latest changes from `develop`.
