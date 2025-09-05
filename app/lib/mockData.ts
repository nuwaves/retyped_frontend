export interface Show {
  id: string;
  slug: string;
  title: string;
  author: string;
  description: string;
  category: string;
  imageUrl: string;
  followers: number;
  episodeCount: number;
  releaseFrequency: string;
  lastEpisodeDate?: string;
  rating?: number;
  language?: string;
  website?: string;
}

export interface Episode {
  id: string;
  showId: string;
  title: string;
  description: string;
  duration: number;
  publishDate: string;
  episodeNumber: number;
  audioUrl?: string;
}

const mockShows: Show[] = [
  {
    id: '1',
    slug: 'crime-junkie',
    title: 'Crime Junkie',
    author: 'audiochuck',
    description: "Does hearing about a true crime case always leave you scouring the internet for the truth behind the story? Dive into your next mystery with Crime Junkie. Every Monday, join your host Ashley Flowers as she unravels all the details of infamous and underreported cases from around the world. With her signature storytelling style and dedication to victims' voices, Ashley brings a fresh perspective to the true crime genre that will keep you coming back week after week.",
    category: 'True Crime',
    imageUrl: '/crime-junkie-logo.jpg',
    followers: 247000,
    episodeCount: 45,
    releaseFrequency: 'Weekly Episodes',
    lastEpisodeDate: '2024-01-15',
    rating: 4.8,
    language: 'en',
    website: 'https://crimejunkiepodcast.com'
  },
  {
    id: '2',
    slug: 'the-daily-podcast',
    title: 'The Daily',
    author: 'The New York Times',
    description: "This is what the news should sound like. The biggest stories of our time, told by the best journalists in the world. Hosted by Michael Barbaro and Sabrina Tavernise. Twenty minutes a day, five days a week, ready by 6 a.m.",
    category: 'News',
    imageUrl: '/the-daily-logo.jpg',
    followers: 523000,
    episodeCount: 1250,
    releaseFrequency: 'Daily Episodes',
    lastEpisodeDate: '2024-01-16',
    rating: 4.6,
    language: 'en',
    website: 'https://www.nytimes.com/column/the-daily'
  },
  {
    id: '3',
    slug: 'conan-obrien-needs-friend',
    title: "Conan O'Brien Needs A Friend",
    author: "Team Coco & Earwolf",
    description: "After 25 years of doing a late night talk show, Conan realized that the only people at his holiday party are the men and women who work for him. Over the years and despite thousands of interviews, Conan has never made a real and lasting friendship with any of his celebrity guests. So, he started a podcast to do just that. Deeper, unbounded conversations with people he thinks are really interesting.",
    category: 'Comedy',
    imageUrl: '/conan-logo.jpg',
    followers: 189000,
    episodeCount: 230,
    releaseFrequency: 'Weekly Episodes',
    lastEpisodeDate: '2024-01-14',
    rating: 4.9,
    language: 'en',
    website: 'https://teamcoco.com/conanneedsfriend'
  }
];

export async function getShowBySlug(slug: string): Promise<Show | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const show = mockShows.find(s => s.slug === slug);
  return show || null;
}

export async function getAllShows(): Promise<Show[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockShows;
}

export async function getShowEpisodes(showId: string): Promise<Episode[]> {
  // Mock episodes data
  const episodes: Episode[] = [
    {
      id: '1',
      showId,
      title: 'Episode 1: The Beginning',
      description: 'Our first episode where we explore the origins...',
      duration: 2400,
      publishDate: '2024-01-15',
      episodeNumber: 1,
    },
    {
      id: '2',
      showId,
      title: 'Episode 2: Going Deeper',
      description: 'We dive deeper into the mystery...',
      duration: 2700,
      publishDate: '2024-01-08',
      episodeNumber: 2,
    }
  ];
  
  await new Promise(resolve => setTimeout(resolve, 100));
  return episodes.filter(ep => ep.showId === showId);
}