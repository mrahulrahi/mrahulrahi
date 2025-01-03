import { NextResponse } from 'next/server';

export default async function handler(req, res) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.CHANNEL_ID;

  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&maxResults=10`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching YouTube API:', error.message);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
