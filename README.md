# Live Deployed Version

Access the application at: [http://54.86.168.67:8080/](http://54.86.168.67:8080/)

## Login Credentials
- **Email:** test@email.com  
- **Password:** tester  

---

## Application Setup and Requirements

This project consists of a backend and a frontend. Below are the details of the required runtimes, engines, and tools, including their specific versions, as well as instructions to set up and run the application.

### Runtimes
The following runtimes are required to execute the application:
- **Node.js:** Version `v20.18.1` – Required for running the backend and frontend.
- **npm:** Version `10.8.2` – Used for managing dependencies and running scripts.
- **PostgreSQL:** Version `v17` (Remote) – The database connection is configured to use an AWS instance. For local testing, replace the database connection settings in the code.

---

### Requirements

#### General Requirements
- **Operating System:** Linux, macOS, or Windows.
- **Node.js:** Version `v20.18.1`
- **npm:** Version `10.8.2`

#### Backend Requirements
The backend uses the following tools and dependencies:
- **Framework:** NestJS `^10.0.0`
- **Database Library:** TypeORM `^0.3.20`
- **Database Driver:** PostgreSQL (pg) `^8.13.1`
- **Validation Libraries:**
  - class-validator `^0.14.1`
  - class-transformer `^0.5.1`
- **JWT Authentication:**
  - @nestjs/jwt `^10.2.0`
  - passport-jwt `^4.0.1`
- **Testing Tools:**
  - Jest `^29.5.0`
  - Supertest `^7.0.0`
- **TypeScript Compiler:** TypeScript `^5.1.3`

> For the full list of backend dependencies, refer to the `package.json` file in the Backend directory.

#### Frontend Requirements
The frontend uses the following tools and dependencies:
- **Framework:** React `^18.3.1`
- **Build Tool:** Vite `^6.0.5`
- **TypeScript Compiler:** TypeScript `~5.6.2`
- **Styling:**
  - TailwindCSS `^3.4.17`
  - PostCSS `^8.4.49`
- **State Management and API Handling:**
  - React Query (@tanstack/react-query) `^5.62.14`
  - Axios `^1.7.9`
- **Form Management:** React Hook Form `^7.54.2`
- **Routing:** React Router DOM `^7.1.1`

> For the full list of frontend dependencies, refer to the `package.json` file in the Frontend directory.

---

### Setup Instructions

1. **Install Prerequisites:**  
   Ensure you have Node.js (`v20.18.1`) and npm (`v10.8.2`) installed on your system. If not, the setup script will attempt to install them automatically.

2. **Run the Setup Script:**  
   Use the provided `start-app.sh` script to set up and run the application. Execute the following command from the root directory:
   ```bash
   chmod +x start-app.sh && ./start-app.sh

The script will:

- Install dependencies for the backend and frontend.
- Start the backend server in development mode.
- Start the frontend development server.

### Environment Variables
The repository does not include environment variables. To run the project locally, replace placeholder values in the code with real ones. In production, the systems are deployed with their respective environment variables.
