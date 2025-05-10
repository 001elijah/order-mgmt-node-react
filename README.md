# Order Management System

A modern order management application built with Node.js, Express, React, and PostgreSQL.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
    - [Clone the Repository](#clone-the-repository)
    - [Option 1: Running with Docker](#option-1-running-with-docker)
    - [Option 2: Running Locally](#option-2-running-locally)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Frontend](#frontend)
- [Backend](#backend)
- [Database](#database)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)
- Docker and Docker Compose (for containerized setup)
- PostgreSQL (for local setup)

## Project Structure

```bash
order-mgmt-node-react/
├── backend/ # Express.js backend
│
├── bin/
│
├── public/
│
├── routes/
│
├── views/
│
├── Dockerfile
│
├── .env.development
│
├── .env.production
│
└── app.js
├── frontend/ # React frontend
│
├── public/
│
├── src/
│
└── Dockerfile
└── compose.yaml # Docker Compose configuration
```


## Getting Started

### Clone the Repository

```bash
git clone https://github.com/001elijah/order-mgmt-node-react.git
cd order-mgmt-node-react
```

### Option 1: Running with Docker

The easiest way to run the application is using Docker, which sets up the entire environment including the database.

#### Production Mode

Run the application in production mode:

```bash
docker-compose up
```

This uses the `.env.production` configuration by default.

#### Development Mode

Run the application in development mode with hot-reloading:

```bash
NODE_ENV=development docker-compose up
```

This setup requires both `.env.production` and `.env.development` files to exist in the backend directory.

#### Rebuild Containers

If you make changes to dependencies (package.json):

```bash
docker-compose build
````
or 
```bash
docker-compose build backend
````
or 
```bash
docker-compose build frontend
```


#### Stop and Clean Up

To stop the containers:

```bash
docker-compose down
```

To stop and remove volumes (including database data):

```bash
docker-compose down -v
```


### Option 2: Running Locally

For local development without Docker, you'll need to run the frontend, backend, and database separately.

#### Setup the Database

1. Install PostgreSQL
2. Create a database named `order_mgmt`
3. Update connection details in backend/.env files

#### Backend Setup

```bash
cd backend
npm install
```

#### Start Backend (Production)

```bash
cd backend
npm start
```

#### Start Backend (Development with hot-reload)

```bash
cd backend
npm run start:dev
```

#### Frontend Setup

```bash
cd frontend
npm install
```
```bash
cd frontend
npm start
```

Now you need to have at least two terminal windows open:
1. One for the backend
2. One for the frontend

The application should be accessible at:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000)

## Environment Variables

The application uses different environment files for development and production:

### Backend

**Production** (backend/.env):

```
NODE_ENV=production
PORT=8000
DATABASE_URL=postgres://postgres:postgres@db:5432/order_mgmt

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=order_mgmt
POSTGRES_HOST=db
POSTGRES_PORT=5432
DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
```

**Development** (backend/.env):

```
NODE_ENV=development
PORT=8000
DATABASE_URL=postgres://postgres:postgres@db:5432/order_mgmt

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=order_mgmt
POSTGRES_HOST=db
POSTGRES_PORT=5432
DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
```

For local setup without Docker, modify the DATABASE_URL to point to your local PostgreSQL instance:

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/order_mgmt
```

### Frontend
The frontend uses environmental variables for API URL configuration:

```
REACT_APP_API_URL=http://localhost:8000
```

## Development
### Backend Development
The backend uses Express.js and includes:
- Nodemon for hot-reloading in development
- REST API endpoints in the routes directory
- Middleware configuration in app.js

### Frontend Development
The frontend is a React application with TypeScript and includes:
- Component-based architecture
- React hooks for state management
- TypeScript for type safety

## Testing

The application has a comprehensive testing suite for both backend and frontend components.

### Backend Testing

Backend tests are written using Jest and Supertest for API endpoint testing. The tests are located in the `backend/tests` directory.

To run backend tests:

```bash
cd backend
npm test
```

The backend test suite includes:
- API endpoint tests
- Unit tests for core functionality

### Frontend Testing

Frontend tests are written using React Testing Library and Jest. The test files are located alongside the components they test with a `.test.tsx` extension.

To run frontend tests:

```bash
cd frontend
npm test
```
