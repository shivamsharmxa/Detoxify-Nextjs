import React, { useState, useEffect } from 'react';
import { Video } from '@/app/types';  

interface TopicsProps {
  searchQuery: string;
  searchResults: Video[];
  defaultTopics: Video[];
  onLoadMore: () => void;
  loading: boolean;
  error: string | null;
  nextPageToken: string | null;
}

const Topics: React.FC<TopicsProps> = ({
  searchQuery,
  searchResults,
  defaultTopics,
  onLoadMore,
  loading,
  error,
  nextPageToken,
}) => {
  const [videos, setVideos] = useState<Video[]>(defaultTopics);

  useEffect(() => {
    setVideos(searchQuery ? searchResults : defaultTopics);
  }, [searchQuery, searchResults, defaultTopics]);

  return (
    <div className="py-12 bg-gray-900">
      <div className="text-center mb-8">
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
          Be Productive
        </p>
      </div>
      <div className="mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {loading && <p className="text-white text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}
        {!loading && !error && (!videos || videos.length === 0) && (
          <p className="text-white text-center">No results found</p>
        )}
        {videos && videos.map((video, index) => (
          <div key={`${video.id.videoId}-${index}`} className="flex justify-center">
            <div className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
              <div className="relative w-full h-60">
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  className="rounded-t-lg object-cover w-full h-full"
                />
              </div>
              <div className="p-6 flex flex-col items-center text-center">
                <h3 className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                  {video.snippet.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  {video.snippet.description}
                </p>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-4 py-2 rounded-lg text-xs font-normal text-white bg-teal-600 hover:bg-teal-700 transition duration-200"
                >
                  Watch Video →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-20 text-center">
        <button
          onClick={onLoadMore}
          className="px-4 py-2 rounded-lg border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200"
        >
          View More Videos
        </button>
      </div>
    </div>
  );
};

export default Topics;
