package handlers

import (
	"backend/internal/models"
	"backend/internal/repositories"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

// GetPasswordCards retrieves all password cards
func GetPasswordCards(repo repositories.PasswordCardRepository, w http.ResponseWriter, r *http.Request) {
	cards := repo.GetAll()
	json.NewEncoder(w).Encode(cards)
}

// CreatePasswordCard creates a new password card
func CreatePasswordCard(repo repositories.PasswordCardRepository, w http.ResponseWriter, r *http.Request) {
	var card models.PasswordCard
	if err := json.NewDecoder(r.Body).Decode(&card); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	newCard := repo.Create(card)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newCard)
}

// UpdatePasswordCard updates an existing password card
func UpdatePasswordCard(repo repositories.PasswordCardRepository, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	var card models.PasswordCard
	if err := json.NewDecoder(r.Body).Decode(&card); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	updatedCard, err := repo.Update(id, card)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(updatedCard)
}

// DeletePasswordCard deletes a specific password card
func DeletePasswordCard(repo repositories.PasswordCardRepository, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	if err := repo.Delete(id); err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
