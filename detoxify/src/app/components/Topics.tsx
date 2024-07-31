import React, { useEffect, useState } from 'react';

interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

interface TopicsProps {
  searchQuery: string;
}

const Topics: React.FC<TopicsProps> = ({ searchQuery }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchQuery) {
      fetchVideos(searchQuery);
    }
  }, [searchQuery]);

  const fetchVideos = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/videos?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('API response:', data); // Verify the response structure

      // Ensure data is in the correct format
      if (Array.isArray(data)) {
        setVideos(data);
      } else {
        console.error('Unexpected data format:', data);
        setError('Unexpected data format');
      }
    } catch (error: any) {
      console.error('Error fetching videos:', error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

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
        {!loading && !error && videos.length === 0 && (
          <p className="text-white text-center">No results found</p>
        )}
        {videos.map((video) => (
          <div key={video.id.videoId} className="flex justify-center">
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
        <a
          href="/courses"
          className="px-4 py-2 rounded-lg border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200"
        >
          View All Courses
        </a>
      </div>
    </div>
  );
};

export default Topics;
