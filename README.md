# Password Management Application

## Introduction

This application provides a simplified password management system similar to LastPass, focusing on cards and card contents. Users can create, edit, delete, and search for password cards. The password field can be hidden or shown, and the password can be copied to the clipboard.

## Technical Stack

### Backend

- **Language:** Go
- **Framework:** Go standard library
- **Containerization:** Docker

### Frontend

- **Framework:** Next.js, Tailwind

## Requirements

To run this project, the following tools must be installed:

- **Docker:** Required for containerizing the application.
- **Docker Compose:** Required for defining and running multi-container Docker applications.

## Backend

The backend is designed with a modular approach that separates the different concerns:

- **Models:** Defines the structure of the password card.
- **Handlers:** Implements the business logic for handling requests.
- **Repositories:** Manages the data storage in memory, allowing flexibility for future scalability.

## Frontend

The frontend uses Next.js to provide a React-based user interface. It is organized into components, services, and pages to allow for reusability and maintainability.

- **Components:** Reusable UI elements.
- **Services:** Handles communication with the backend.
- **Pages:** Composes components to form the complete pages.

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

Within the frontend directory, run:

```bash
yarn test
```

## Technical Dependencies and Libraries

- **Backend:** Go standard library
- **Frontend:** Next.js, Tailwind CSS
- **Backend Libraries:**
  - **UUID Generation:** [github.com/google/uuid](https://pkg.go.dev/github.com/google/uuid) v1.3.0
  - **Router:** [github.com/gorilla/mux](https://pkg.go.dev/github.com/gorilla/mux) v1.8.0
  - **CORS Middleware:** [github.com/rs/cors](https://pkg.go.dev/github.com/rs/cors) v1.9.0

## How to Run

1. Clone the repository to your local machine.
2. Navigate to the project root directory.
3. Run `docker-compose build` to build the Docker images.
4. Run `docker-compose up` to start the containers.
5. Access the application at [http://localhost:3000](http://localhost:3000).
