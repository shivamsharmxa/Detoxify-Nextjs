'use client';

import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Topics from './components/Topics';
import { Video } from '@/app/types';

export default function Home() {
  const [searchResults, setSearchResults] = useState<Video[]>([]);
  const [defaultTopics, setDefaultTopics] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  useEffect(() => {
    fetchDefaultTopics();
  }, []);

  const fetchDefaultTopics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/videos?query=study`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setDefaultTopics(data.items);
      setNextPageToken(data.nextPageToken || null);
    } catch (error: any) {
      console.error('Error fetching default topics:', error);
      setError(error.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/videos?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setSearchResults(data.items);
      setNextPageToken(data.nextPageToken || null);
      setSearchQuery(query);
    } catch (error: any) {
      console.error('Error searching:', error);
      setError(error.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async (query: string, pageToken?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/videos?query=${encodeURIComponent(query)}&pageToken=${pageToken || ''}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setSearchResults((prevResults) => [...prevResults, ...data.items]);
      setNextPageToken(data.nextPageToken || null);
    } catch (error: any) {
      console.error('Error loading more:', error);
      setError(error.message || 'Failed to fetch data');
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
        defaultTopics={defaultTopics}
        onLoadMore={handleLoadMore}
        loading={loading}
        error={error}
        nextPageToken={nextPageToken}
      />
    </>
  );
}
