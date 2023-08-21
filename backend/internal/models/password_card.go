package models

type PasswordCard struct {
	ID       string `json:"id"`
	URL      string `json:"url"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Password string `json:"password"`
}
