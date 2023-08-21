import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PasswordCardList from '../components/PasswordCardList';
import PasswordCardForm from '../components/PasswordCardForm';
import {
  getAllCards,
  createCard,
  PasswordModel,
  updateCard,
  deleteCard,
} from '../services/passwordCardService';

const IndexPage: React.FC = () => {
  const [cards, setCards] = useState<Array<PasswordModel>>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState<PasswordModel | null>(null);

  const fetchCards = () => {
    getAllCards()
      .then(setCards)
      .catch((error) => alert('Error fetching cards: ' + error.message));
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleCreateCard = async (
    url: string,
    name: string,
    username: string,
    password: string,
  ) => {
    try {
      await createCard({ url, name, username, password });
      fetchCards(); // Fetch cards again after creating a new card
      console.log('Card created, closing modal');
      setShowModal(false);
    } catch (error) {
      if (error instanceof Error) {
        alert('Error deleting card: ' + error.message);
      } else {
        alert('Unknown error occurred');
      }
    }
  };

  const handleEditCard = (card: PasswordModel) => {
    setEditingCard(card);
    setShowModal(true);
  };

  const handleUpdateCard = async (
    url: string,
    name: string,
    username: string,
    password: string,
  ) => {
    console.log('handleUpdateCard called');
    if (editingCard) {
      console.log('Editing card:', editingCard);
      const updatedCard = { ...editingCard, url, name, username, password };
      try {
        await updateCard(editingCard.id, updatedCard);
        fetchCards();
        setShowModal(false);
        setEditingCard(null);
      } catch (error) {
        if (error instanceof Error) {
          alert('Error deleting card: ' + error.message);
        } else {
          alert('Unknown error occurred');
        }
      }
    } else {
      console.log('No editing card');
    }
  };

  const handleDeleteCard = async (card: PasswordModel) => {
    try {
      await deleteCard(card.id);
      fetchCards();
    } catch (error) {
      if (error instanceof Error) {
        alert('Error deleting card: ' + error.message);
      } else {
        alert('Unknown error occurred');
      }
    }
  };

  const handleCreateNewCard = () => {
    setEditingCard(null);
    setShowModal(true);
  };

  const filteredCards = searchFilter
    ? cards.filter((card) =>
        card.name.toLowerCase().includes(searchFilter.toLowerCase()),
      )
    : cards;

  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <Head>
        <title>Password Manager</title>
      </Head>
      <h1 className="text-4xl mb-4 font-semibold text-gray-700">
        Password Manager
      </h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchFilter}
        onChange={(e) => {
          if (cards) {
            setSearchFilter(e.target.value);
          }
        }}
        className="border p-2 w-full mb-4 rounded shadow"
      />
      <button
        onClick={handleCreateNewCard}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Create New Card
      </button>
      <PasswordCardList
        cards={filteredCards}
        onEdit={handleEditCard}
        onDelete={handleDeleteCard}
      />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="float-right text-red-500"
            >
              X
            </button>
            <PasswordCardForm
              onSubmit={editingCard ? handleUpdateCard : handleCreateCard}
              card={editingCard ?? undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
