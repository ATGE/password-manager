import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PasswordCard from '../components/PasswordCard';
import { PasswordModel } from '@/services/passwordCardService';

describe('<PasswordCard />', () => {
  const card: PasswordModel = {
    id: 'test-id',
    name: 'Test Card',
    url: 'https://example.com',
    username: 'testuser',
    password: 'testpassword',
  };

  it('renders the card information', () => {
    const { getByText } = render(
      <PasswordCard
        card={card}
        onCopyPassword={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />,
    );
    expect(getByText('Test Card')).toBeDefined();
    expect(getByText('URL: https://example.com')).toBeDefined();
    expect(getByText('Username: testuser')).toBeDefined();
  });

  it('calls onCopyPassword when Copy button is clicked', () => {
    const onCopyPassword = jest.fn();
    const { getByText } = render(
      <PasswordCard
        card={card}
        onCopyPassword={onCopyPassword}
        onEdit={() => {}}
        onDelete={() => {}}
      />,
    );
    fireEvent.click(getByText('Copy'));
    expect(onCopyPassword).toHaveBeenCalled();
  });

  it('calls onEdit when Edit button is clicked', () => {
    const onEdit = jest.fn();
    const { getByText } = render(
      <PasswordCard
        card={card}
        onCopyPassword={() => {}}
        onEdit={onEdit}
        onDelete={() => {}}
      />,
    );
    fireEvent.click(getByText('✏️ Edit'));
    expect(onEdit).toHaveBeenCalled();
  });

  it('calls onDelete when Delete button is clicked', () => {
    const onDelete = jest.fn();
    const { getByText } = render(
      <PasswordCard
        card={card}
        onCopyPassword={() => {}}
        onEdit={() => {}}
        onDelete={onDelete}
      />,
    );
    fireEvent.click(getByText('🗑️ Delete'));
    expect(onDelete).toHaveBeenCalled();
  });
});
