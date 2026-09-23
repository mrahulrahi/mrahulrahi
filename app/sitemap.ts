import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mrahulrahi.vercel.app';
  const currentDate = new Date();

  const routes = [
    '',
    '/workspace',
    '/tools',
    '/ui',
    '/products',
    '/code-blocks',
    '/style-guide',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
