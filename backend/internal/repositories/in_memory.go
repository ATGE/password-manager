package repositories

import (
	"backend/internal/models"
	"errors"

	"github.com/google/uuid"
)

type InMemoryPasswordCardRepository struct {
	Cards map[string]models.PasswordCard
}

// GetAll retrieves all password cards
func (repo *InMemoryPasswordCardRepository) GetAll() []models.PasswordCard {
	var cards []models.PasswordCard
	for _, card := range repo.Cards {
		cards = append(cards, card)
	}
	return cards
}

// GetByID retrieves a password card by ID
func (repo *InMemoryPasswordCardRepository) GetByID(id string) (models.PasswordCard, error) {
	card, exists := repo.Cards[id]
	if !exists {
		return models.PasswordCard{}, errors.New("Card not found")
	}
	return card, nil
}

// Create creates a new password card
func (repo *InMemoryPasswordCardRepository) Create(card models.PasswordCard) models.PasswordCard {
	// Generate a unique ID for the card (in a real-world scenario, you would use a proper ID generator)
	card.ID = uuid.New().String()
	repo.Cards[card.ID] = card
	return card
}

// Update updates an existing password card
func (repo *InMemoryPasswordCardRepository) Update(id string, card models.PasswordCard) (models.PasswordCard, error) {
	_, exists := repo.Cards[id]
	if !exists {
		return models.PasswordCard{}, errors.New("Card not found")
	}
	card.ID = id
	repo.Cards[id] = card
	return card, nil
}

// Delete deletes a specific password card
func (repo *InMemoryPasswordCardRepository) Delete(id string) error {
	_, exists := repo.Cards[id]
	if !exists {
		return errors.New("Card not found")
	}
	delete(repo.Cards, id)
	return nil
}
