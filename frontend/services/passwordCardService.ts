export interface PasswordModel {
  id: string;
  url: string;
  name: string;
  username: string;
  password: string;
}

export const createCard = async (card: {
  url: string;
  name: string;
  username: string;
  password: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/password-cards`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to create card');
  }

  return await response.json();
};

export async function getAllCards() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/password-cards`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch cards');
  }
  //show response in console to see what it looks like with a message
  console.log('getAllCards', response);
  return await response.json();
}
export const updateCard = async (
  id: string,
  card: PasswordModel,
): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/password-cards/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    },
  );

  if (!response.ok) {
    throw new Error('Error updating card');
  }
};
export const deleteCard = async (id: string): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/password-cards/${id}`,
    {
      method: 'DELETE',
    },
  );

  if (!response.ok) {
    throw new Error('Error deleting card');
  }
};
