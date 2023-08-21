# Password Management Application - Backend

## Technical Stack

- **Language:** Go
- **Framework:** Go standard library
- **Containerization:** Docker

## Requirements

To run this project, the following tools must be installed:

- **Docker:** Required for containerizing the application.

## Backend

The backend is designed with a modular approach that separates the different concerns:

- **Models:** Defines the structure of the password card.
- **Handlers:** Implements the business logic for handling requests.
- **Repositories:** Manages the data storage in memory, allowing flexibility for future scalability.

## REST API Endpoints

- `/password-cards`
  - **GET:** Retrieve all cards.
  - **POST:** Create a new card.
- `/password-cards/{id}`
  - **PUT:** Edit a specific card.
  - **DELETE:** Remove a specific card.

## Assumptions and Limitations

- **Data Storage:** Data is stored in memory and is not persisted between sessions.
- **Security:** As this is a simplified solution, it doesn't include features like encryption, authentication, or authorization.

## Unit Testing

## Unit Testing

### Requirements

- **Go:** Version 1.17 or higher must be installed.

### Running Tests

Within the backend directory, run:

```bash
go test ./...
```

## Technical Dependencies and Libraries

- **Backend:** Go standard library
- **Backend Libraries:**
  - **UUID Generation:** [github.com/google/uuid](https://pkg.go.dev/github.com/google/uuid) v1.3.0
  - **Router:** [github.com/gorilla/mux](https://pkg.go.dev/github.com/gorilla/mux) v1.8.0
  - **CORS Middleware:** [github.com/rs/cors](https://pkg.go.dev/github.com/rs/cors) v1.9.0

## How to Run

To run this project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the backend directory.
3. Run `docker build -t backend .` to build the Docker image.
4. Run `docker run -p 8000:8000 backend` to start the container.
5. Access the API at [http://localhost:8080](http://localhost:8000).
