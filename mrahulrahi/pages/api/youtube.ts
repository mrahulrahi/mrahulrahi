import { NextApiRequest, NextApiResponse } from 'next';

type Video = {
  id: { videoId: string };
  snippet: { title: string; description: string; thumbnails: { medium: { url: string } } };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID } = process.env;

  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    console.error("Missing environment variables");
    return res.status(500).json({ error: "Missing environment variables" });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet&type=video&maxResults=15`,
      { cache: "no-store" }
    );

    console.log(response);

    if (!response.ok) {
      console.error("Failed to fetch YouTube videos", response.statusText);
      throw new Error("Failed to fetch YouTube videos");
    }

    const data = await response.json();
    res.status(200).json(data.items || []);
  } catch (error) {
    console.error("Error fetching YouTube videos", error);
    res.status(500).json({ error: (error as Error).message });
  }
}
