import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rahul Maurya | Front-end Developer & UI/UX Architect',
    short_name: 'mrahulrahi',
    description: 'Personal Portfolio & Developer Workspace of Rahul Maurya, Front-end Developer specializing in React, Next.js, and the MERN stack.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#11d486',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
