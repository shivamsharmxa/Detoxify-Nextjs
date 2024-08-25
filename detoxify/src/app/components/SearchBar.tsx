'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation'; // Ensure this import is correct
import { LampContainer } from './ui/lamp';
import { PlaceholdersAndVanishInput } from '../components/ui/placeholders-and-vanish-input';
import { TypewriterEffectSmooth } from './ui/typewriter-effect';

const words = [
  { text: 'Focus' },
  { text: 'On' },
  { text: 'Goals' },
  { text: 'with' },
  { text: 'Detoxify.', className: 'text-blue-500 dark:text-blue-500' },
];

interface SearchBarProps {
  onSearch: (searchQuery: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');
  const router = useRouter(); // For redirection

  const placeholders = [
    'How to learn React?',
    'How to be productive?',
    'Error handling in TypeScript?',
    'Write a Javascript method to reverse a string',
    'How to assemble your own PC?',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Submitted query:', query);
      onSearch(query.trim());
    } else {
      console.error('Query value is undefined or null');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies if your API uses them
      });

      if (response.ok) {
        router.push('/auth/Dashboard'); // Redirect on success
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <div className="h-[40rem] flex flex-col justify-center items-center px-4">
        <LampContainer>
          <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
            <TypewriterEffectSmooth words={words} />
          </h2>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            value={query}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </LampContainer>
      </div>

      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700"
      >
        Logout
      </button>
    </>
  );
};

export default SearchBar;
