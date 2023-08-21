package repositories

import "backend/internal/models"

type PasswordCardRepository interface {
	GetAll() []models.PasswordCard
	GetByID(id string) (models.PasswordCard, error)
	Create(card models.PasswordCard) models.PasswordCard
	Update(id string, card models.PasswordCard) (models.PasswordCard, error)
	Delete(id string) error
}
