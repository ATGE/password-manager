import React from 'react';
import PasswordCard from './PasswordCard';
import { PasswordModel } from '@/services/passwordCardService';

type PasswordCardListProps = {
  cards: Array<PasswordModel>;
  onEdit: (card: PasswordModel) => void;
  onDelete: (card: PasswordModel) => void;
};

const PasswordCardList: React.FC<PasswordCardListProps> = ({
  cards,
  onEdit,
  onDelete,
}) => {
  if (!cards) return null;
  return (
    <div className="grid grid-cols-1 gap-4">
      {cards.map((card) => (
        <PasswordCard
          key={card.id}
          card={card}
          onCopyPassword={() => navigator.clipboard.writeText(card.password)}
          onEdit={() => onEdit(card)}
          onDelete={() => onDelete(card)}
        />
      ))}
    </div>
  );
};

export default PasswordCardList;
