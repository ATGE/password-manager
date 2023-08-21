import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import IndexPage from '../pages/index';
import * as passwordCardService from '../services/passwordCardService';

jest.mock('../services/passwordCardService', () => ({
  getAllCards: jest.fn(() => Promise.resolve([])),
  createCard: jest.fn(() => Promise.resolve()),
  updateCard: jest.fn(() => Promise.resolve()),
  deleteCard: jest.fn(() => Promise.resolve()),
}));

describe('IndexPage component', () => {
  it('creates a new card when the form is filled and saved', async () => {
    const { getByText, getByPlaceholderText } = render(<IndexPage />);

    fireEvent.click(getByText('Create New Card'));

    fireEvent.change(getByPlaceholderText('URL'), {
      target: { value: 'http://example.com' },
    });
    fireEvent.change(getByPlaceholderText('Name'), {
      target: { value: 'Card Name' },
    });
    fireEvent.change(getByPlaceholderText('Username'), {
      target: { value: 'user1' },
    });
    fireEvent.change(getByPlaceholderText('Password'), {
      target: { value: 'pass1' },
    });

    // Click the "Save" button (adjust this line to match the actual button text or selector)
    await act(async () => {
      fireEvent.click(getByText('Save'));
    });

    // Check if the createCard function was called with the correct arguments
    expect(passwordCardService.createCard).toHaveBeenCalledWith({
      url: 'http://example.com',
      name: 'Card Name',
      username: 'user1',
      password: 'pass1',
    });
  });
});
