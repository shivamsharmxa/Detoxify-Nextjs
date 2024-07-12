// api.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { google, youtube_v3 } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: "AIzaSyAy623zXdc3y7NEYEESCw9JDuSQ0uMLHSM", // Replace with your YouTube API key
});

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

    const items = response.data.items?.map(item => ({
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
