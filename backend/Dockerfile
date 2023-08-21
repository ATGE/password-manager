# Use the official Go image as a base image
FROM golang:1.17 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Go module files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the code
COPY . .

# Build the Go app
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./cmd/main.go

# Use a minimal image for the runtime
FROM alpine:latest

# Copy the binary from the builder stage
COPY --from=builder /app/main /app/main

# Expose port 8000 for the application
EXPOSE 8000

# Run the binary
CMD ["/app/main"]
