import React from 'react';
import { PasswordModel } from '@/services/passwordCardService';

type PasswordCardProps = {
  card: PasswordModel;
  onCopyPassword: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const PasswordCard: React.FC<PasswordCardProps> = ({
  card,
  onCopyPassword,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="max-w-full border p-4 rounded-md overflow-hidden">
      <h3 className="text-xl truncate">{card.name}</h3>
      <p className="truncate">URL: {card.url}</p>
      <p className="truncate">Username: {card.username}</p>
      <p className="truncate whitespace-nowrap">
        Password: ******
        <button
          onClick={onCopyPassword}
          className="bg-blue-200 text-blue-700 p-1 rounded ml-2"
        >
          Copy
        </button>
      </p>
      <div className="flex space-x-2">
        <button
          onClick={onEdit}
          className="bg-yellow-200 text-yellow-700 p-1 rounded"
        >
          ✏️ Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-200 text-red-700 p-1 rounded"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default PasswordCard;
