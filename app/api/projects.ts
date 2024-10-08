import type { NextApiRequest, NextApiResponse } from 'next';

const projects = [
    { id: 1, title: 'Imagine Group', imgUrl: '/project-img-2.png', gitHubUrl: 'https://github.com/mrahulrahi/ig-app', liveUrl: 'http://imaginegindia.com' },
    { id: 2, title: 'Soul Sync', imgUrl: '/project-img-3.png', gitHubUrl: 'https://github.com/mrahulrahi/soulsync', liveUrl: 'https://soulsyncapp.vercel.app' },
    { id: 3, title: 'Weather App', imgUrl: '/project-img-4.png', gitHubUrl: 'https://github.com/mrahulrahi/mrahulrahi', liveUrl: 'https://mrahulrahi.vercel.app/tools/weather-app' },
    { id: 4, title: 'Notes App', imgUrl: '/project-img-5.png', gitHubUrl: 'https://github.com/mrahulrahi/mrahulrahi', liveUrl: 'https://mrahulrahi.vercel.app/tools/notes-app' },
    { id: 5, title: 'Quiz Game', imgUrl: '/project-img-6.png', gitHubUrl: 'https://github.com/mrahulrahi/mrahulrahi', liveUrl: 'https://mrahulrahi.vercel.app/tools/quiz-game' },
    { id: 6, title: 'Calculator', imgUrl: '/project-img-7.png', gitHubUrl: 'https://github.com/mrahulrahi/mrahulrahi', liveUrl: 'https://mrahulrahi.vercel.app/tools/calculator' }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(projects);
}
