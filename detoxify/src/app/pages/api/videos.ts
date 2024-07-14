// src/pages/api/videos.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { google, youtube_v3 } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY, // Ensure this is set in your environment variables
});

export type Video = {
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
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    res.status(400).json({ error: 'Query parameter is required' });
    return;
  }

  try {
    const response = await youtube.search.list({
      part: ['snippet'],
      q: query,
      type: ['video'],
      maxResults: 9,
    });

    const items: Video[] = response.data.items?.map(item => ({
      id: {
        videoId: item.id?.videoId ?? '',
      },
      snippet: {
        title: item.snippet?.title ?? '',
        description: item.snippet?.description ?? '',
        thumbnails: {
          high: {
            url: item.snippet?.thumbnails?.high?.url ?? '',
          },
        },
      },
    })) ?? [];

    res.status(200).json(items);
  } catch (error) {
    console.error('Failed to fetch data from YouTube API:', error);
    res.status(500).json({ error: 'Failed to fetch data from YouTube API' });
  }
}
