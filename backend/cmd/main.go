package main

import (
	"backend/internal/handlers"
	"backend/internal/models"
	"backend/internal/repositories"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	repo := &repositories.InMemoryPasswordCardRepository{Cards: make(map[string]models.PasswordCard)}
	router := mux.NewRouter()

	// GET all password cards
	router.HandleFunc("/password-cards", func(w http.ResponseWriter, r *http.Request) {
		handlers.GetPasswordCards(repo, w, r)
	}).Methods("GET")

	// POST a new password card
	router.HandleFunc("/password-cards", func(w http.ResponseWriter, r *http.Request) {
		handlers.CreatePasswordCard(repo, w, r)
	}).Methods("POST")

	// PUT (update) a specific password card
	router.HandleFunc("/password-cards/{id}", func(w http.ResponseWriter, r *http.Request) {
		handlers.UpdatePasswordCard(repo, w, r)
	}).Methods("PUT")

	// DELETE a specific password card
	router.HandleFunc("/password-cards/{id}", func(w http.ResponseWriter, r *http.Request) {
		handlers.DeletePasswordCard(repo, w, r)
	}).Methods("DELETE")

	// CORS configuration
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // Allow all origins
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"*"}, // Allow all headers
		AllowCredentials: true,
	})

	// Start the server
	handler := c.Handler(router)
	log.Fatal(http.ListenAndServe(":8000", handler))
}
