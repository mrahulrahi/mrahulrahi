import { getPublicPortfolioData } from '@/app/(admin)/admin/dataActions';
import { getDevArticles } from '@/app/utils/getArticles';
import PortfolioView from './PortfolioView';
import {
  projectsCards as staticProjects,
  interest as staticInterest,
  timelineItems as staticTimeline,
  certificates as staticCertificates,
  hero as staticHero,
  stats as staticStats,
  about as staticAbout,
  skills as staticSkills
} from '@/app/data/staticData';

export const revalidate = 3600; // Revalidate every hour (ISR)

export default async function Home() {
  let portfolioData = {
    projectsCards: staticProjects,
    interest: staticInterest,
    timelineItems: staticTimeline,
    certificates: staticCertificates,
    hero: staticHero,
    stats: staticStats,
    about: staticAbout,
    skills: staticSkills
  };

  try {
    const liveData = await getPublicPortfolioData();
    if (liveData) {
      portfolioData = {
        projectsCards: liveData.projectsCards || staticProjects,
        interest: liveData.interest || staticInterest,
        timelineItems: liveData.timelineItems || staticTimeline,
        certificates: liveData.certificates || staticCertificates,
        hero: liveData.hero || staticHero,
        stats: liveData.stats || staticStats,
        about: liveData.about || staticAbout,
        skills: liveData.skills || staticSkills
      };
    }
  } catch (err) {
    console.error("Error reading public portfolio data on server:", err);
  }

  // Server-side fetching of dev.to articles with ISR caching
  const articles = await getDevArticles();

  return (
    <PortfolioView
      initialPortfolioData={portfolioData}
      initialArticles={articles}
    />
  );
}
