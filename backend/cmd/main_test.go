package main

import (
	"backend/internal/handlers"
	"backend/internal/models"
	"backend/internal/repositories"
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
)

func TestGetPasswordCards(t *testing.T) {
	repo := &repositories.InMemoryPasswordCardRepository{Cards: make(map[string]models.PasswordCard)}
	router := mux.NewRouter()

	router.HandleFunc("/password-cards", func(w http.ResponseWriter, r *http.Request) {
		handlers.GetPasswordCards(repo, w, r)
	}).Methods("GET")

	req, err := http.NewRequest("GET", "/password-cards", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	router.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}
}
func TestCreatePasswordCard(t *testing.T) {
	repo := &repositories.InMemoryPasswordCardRepository{Cards: make(map[string]models.PasswordCard)}
	router := mux.NewRouter()

	router.HandleFunc("/password-cards", func(w http.ResponseWriter, r *http.Request) {
		handlers.CreatePasswordCard(repo, w, r)
	}).Methods("POST")

	payload := []byte(`{"id":"1","url":"http://example.com","name":"Card 1","username":"user1","password":"password1"}`)
	req, err := http.NewRequest("POST", "/password-cards", bytes.NewBuffer(payload))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	rr := httptest.NewRecorder()
	router.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusCreated {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusCreated)
	}

}
func TestUpdatePasswordCard(t *testing.T) {
	repo := &repositories.InMemoryPasswordCardRepository{Cards: make(map[string]models.PasswordCard)}
	repo.Cards["1"] = models.PasswordCard{ID: "1", URL: "http://example.com", Name: "Card 1", Username: "user1", Password: "password1"}
	router := mux.NewRouter()

	router.HandleFunc("/password-cards/{id}", func(w http.ResponseWriter, r *http.Request) {
		handlers.UpdatePasswordCard(repo, w, r)
	}).Methods("PUT")

	payload := []byte(`{"id":"1","url":"http://example-updated.com","name":"Updated Card","username":"user1","password":"password1"}`)
	req, err := http.NewRequest("PUT", "/password-cards/1", bytes.NewBuffer(payload))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	rr := httptest.NewRecorder()
	router.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

}

func TestDeletePasswordCard(t *testing.T) {
	repo := &repositories.InMemoryPasswordCardRepository{Cards: make(map[string]models.PasswordCard)}

	repo.Cards["1"] = models.PasswordCard{ID: "1", URL: "http://example.com", Name: "Card 1", Username: "user1", Password: "password1"}
	router := mux.NewRouter()

	router.HandleFunc("/password-cards/{id}", func(w http.ResponseWriter, r *http.Request) {
		handlers.DeletePasswordCard(repo, w, r)
	}).Methods("DELETE")

	req, err := http.NewRequest("DELETE", "/password-cards/1", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	router.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusNoContent {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusNoContent)
	}
}
