import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mrahulrahi.vercel.app';
  const currentDate = new Date();

  const mainRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/workspace', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/tools', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/ui', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/products', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/code-blocks', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/style-guide', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/tools/calculator-app', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/tools/expense-tracker', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/tools/notes-app', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/tools/quiz-app', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/tools/quote-app', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/tools/retirement-planner', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/tools/salary-calculator', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/tools/salary-divider', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/tools/smart-emi-planner', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/tools/weather-app', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  return mainRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
