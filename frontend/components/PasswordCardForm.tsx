import React, { useState } from 'react';
import { PasswordModel } from '../services/passwordCardService';

type PasswordCardFormProps = {
  onSubmit: (
    url: string,
    name: string,
    username: string,
    password: string,
  ) => void;
  card?: PasswordModel;
};

const PasswordCardForm: React.FC<PasswordCardFormProps> = ({
  onSubmit,
  card,
}) => {
  const [url, setUrl] = useState(card?.url || '');
  const [name, setName] = useState(card?.name || '');
  const [username, setUsername] = useState(card?.username || '');
  const [password, setPassword] = useState(card?.password || '');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url, name, username, password);
    setUrl('');
    setName('');
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <div className="flex flex-col ">
        <label htmlFor="url" className="block font-medium">
          URL
        </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 w-full rounded-md"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="name" className="block font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded-md"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="username" className="block font-medium">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full rounded-md"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="block font-medium">
          Password
        </label>
        <div className="flex">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded-md"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="bg-gray-300 p-2 rounded-md w-20"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Save
      </button>
    </form>
  );
};

export default PasswordCardForm;
