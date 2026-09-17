export interface DevArticle {
  id: number;
  title: string;
  url: string;
  description: string;
  cover_image: string;
  readable_publish_date: string;
  public_reactions_count: number;
  published_at: string;
  user: {
    name: string;
    profile_image: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export async function getDevArticles(): Promise<DevArticle[]> {
  try {
    // Try fetching author-specific articles first with 1-hour ISR cache
    const userRes = await fetch("https://dev.to/api/articles?username=mrahulrahi&per_page=10", {
      next: { revalidate: 3600 },
    });

    if (userRes.ok) {
      const data = await userRes.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }

    // Fallback to latest top dev.to tech articles
    const fallbackRes = await fetch("https://dev.to/api/articles?per_page=10", {
      next: { revalidate: 3600 },
    });

    if (fallbackRes.ok) {
      const fallbackData = await fallbackRes.json();
      if (Array.isArray(fallbackData)) {
        return fallbackData;
      }
    }

    return [];
  } catch (error) {
    console.error("Error fetching Dev.to articles on server:", error);
    return [];
  }
}
