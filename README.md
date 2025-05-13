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
├── db/
│
├── models/
│
├── tests/
│
├── types/
│
├── Dockerfile
│
├── .env
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

The easiest way to run the application is using Docker, which sets up the entire environment, including the database.

#### Production Mode

Run the application in production mode:

```bash
NODE_ENV=production #set NODE_ENV .env variable to production
```

```bash
docker-compose up
```

This uses the `NODE_ENV=development` configuration by default.

#### Development Mode

Run the application in development mode with hot-reloading:

```bash
NODE_ENV=development #set NODE_ENV .env variable to development
```

```bash
docker-compose up
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

#### Backend Setup

```bash
cd backend
npm install
```

#### Setup the Database

```bash
npm run migrate
```

#### Start Backend (Production)

```bash
NODE_ENV=production #set NODE_ENV .env variable to production
```

```bash
cd backend
npm start
```

#### Start Backend (Development with hot-reload)

```bash
NODE_ENV=development #set NODE_ENV .env variable to development
```

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

### Backend

**Production example** (backend/.env):

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

**Development example** (backend/.env):

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

## Api Documentation
Coming soon...

## Database
The Order Management System uses PostgreSQL as its primary database.
### Database Configuration
PostgreSQL configuration is managed through environment variables:
``` 
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=order_mgmt
POSTGRES_HOST=db
POSTGRES_PORT=5432
DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
```
### Schema

The database schema includes the following main tables:
- - User details `users`
- - Order details and status `orders`
- - Product catalog `products`

### Database Migrations

Database migrations are managed using the migration script:
``` bash
npm run migrate
```

This creates the necessary tables and initial data for the application.

### Connecting to the Database

#### Using Docker

When running with Docker, the database is accessible within the Docker network:
- Host: `db`
- Port: `5432`
- Database: `order_mgmt`

#### Local Development

For local development, the database connection string should be set to:

``` 
DATABASE_URL=postgres://postgres:postgres@localhost:5432/order_mgmt
```

### Database Management

For database administration, you can use:
- [pgAdmin](https://www.pgadmin.org/) - A web-based PostgreSQL admin tool
- Command-line tools like `psql`

Example connecting with psql:

``` bash
psql -h localhost -U postgres -d order_mgmt
```

### Backup and Restore

To backup the database:

``` bash
pg_dump -h localhost -U postgres -d order_mgmt > backup.sql
```

To restore from backup:

``` bash
psql -h localhost -U postgres -d order_mgmt < backup.sql
```

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

## Deployment

### Docker-based Deployment

#### Using Docker Compose on VPS (Digital Ocean)

1. **DO Droplet (VPS)** with Docker and Docker Compose installed

2. **Clone the repository and create environment files**
   ```bash
   git clone https://github.com/001elijah/order-mgmt-node-react.git
   cd order-mgmt-node-react
   ```
   
   - Set up .env files for production

3. **Start the application in production mode**
   ```bash
   docker-compose up -d
   ```

4. **Configure NGINX as a reverse proxy**

### CI/CD Pipeline Setup

#### GitHub Actions

Create a workflow file in `.github/workflows/deploy.yml`. Example pipeline setup:
```bash
yaml name: Deploy
on: push: branches: [ main ]
jobs: test: runs-on: ubuntu-latest steps: - uses: actions/checkout@v3 - name: Run tests run: | cd backend npm install npm test cd ../frontend npm install npm test
deploy: needs: test runs-on: ubuntu-latest steps: - uses: actions/checkout@v3 - name: Deploy to production # Add deployment steps based on your platform
latex_unknown_tag
```

## Troubleshooting

Coming soon...
