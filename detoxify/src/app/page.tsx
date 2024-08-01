'use client';

import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Topics from './components/Topics';
import { Video } from '@/app/types';  // Ensure this type is defined properly in your project

export default function Home() {
  const [searchResults, setSearchResults] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('default topic');  // Maintain search query state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/videos?query=${encodeURIComponent(query)}`); // Adjust if needed
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Search results:', data); // Log data to verify
      setSearchResults(data);
      setSearchQuery(query);  // Update the search query state
    } catch (error) {
      console.error('Error searching:', error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <Topics 
        searchQuery={searchQuery} 
        searchResults={searchResults}
        loading={loading}
        error={error}
      />
    </>
  );
}
