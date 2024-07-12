// components/Topics.tsx

import React, { useEffect, useState } from 'react';
import { Video } from '@/app/utils/api';

const Topics = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    // Fetch initial default topics or handle as needed
    fetchVideos('default topic');
  }, []);

  const fetchVideos = async (query: string) => {
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <div className="py-12 bg-gray-900">
      <div className="text-center mb-8">
        <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">FEATURED COURSES</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Learn With the Best</p>
      </div>
      <div className="mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {videos.map((video) => (
          <div key={video.id.videoId} className="flex justify-center">
            <div className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
              <div className="p-6 flex flex-col items-center text-center">
                <h3 className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">{video.snippet.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{video.snippet.description}</p>
                <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer" className="mt-4 px-4 py-2 rounded-lg text-xs font-normal text-white bg-teal-600 hover:bg-teal-700 transition duration-200">
                  Watch Video →
                </a>
              </div>
              <div className="relative w-full h-60">
                <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className="rounded-b-lg object-cover w-full h-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-20 text-center">
        <a href="/courses" className="px-4 py-2 rounded-lg border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200">
          View All Courses
        </a>
      </div>
    </div>
  );
};

export default Topics;
