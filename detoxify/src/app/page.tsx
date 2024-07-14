'use client'

import { useState, useEffect } from 'react';
import SearchBar from "./components/SearchBar";
import Topics from "./components/Topics"
import { Video } from '@/app/pages/api/videos';



export default function Home() {
  const [searchResults, setSearchResults] = useState<Video[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <Topics />
    </>
  );
};
