# Lumina Books - React Book Management System

A modern, simple Book Management System built with React and Vite. It allows users to view, add, update, and delete books with a beautiful, premium glassmorphic UI.

## Features

- **CRUD Operations**: Full Create, Read, Update, and Delete functionality.
- **Search & Filter**: Search books by title or author, and filter by genre.
- **Mock API**: Integrates with `json-server` to mock a real REST API backend.
- **Premium UI**: Built with vanilla CSS using modern design principles (glassmorphism, CSS variables, responsive grid).

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

## Getting Started

1. **Clone the repository** (or download the source code).
2. **Navigate to the project directory**:
   ```bash
   cd book-manager
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the application**:
   ```bash
   npm start
   ```
   *This command uses `concurrently` to run both the Vite development server and the `json-server` mock backend simultaneously.*

5. **View the app**:
   Open your browser and navigate to `http://localhost:5173`.
   (The mock backend runs on `http://localhost:3001`).

## Deployment Instructions (Vercel/Netlify)

Since this app uses `json-server` for the backend, deploying it as a single static site requires a small adjustment. `json-server` is meant for local development.

To deploy this fully:
1. **Mock Backend**: Move your `db.json` data to an online mock service like [MockAPI.io](https://mockapi.io/).
2. **Update API URL**: Change the `API_URL` in `src/api.js` to point to your new online mock API endpoint.
3. **Deploy Frontend**:
   - Push your code to GitHub.
   - Go to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
   - Import your repository. The build settings (`npm run build`, dist folder) will be automatically detected for Vite.
   - Deploy!

## Tech Stack

- **React** (via Vite)
- **Vanilla CSS**
- **Axios** (for API requests)
- **Lucide React** (for icons)
- **JSON Server** (for mock backend)
