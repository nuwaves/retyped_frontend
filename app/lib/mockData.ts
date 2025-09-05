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
  duration: string;
  publishDate: string;
  episodeNumber: number;
  audioUrl?: string;
  isNew?: boolean;
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
  // Mock episodes data - different styles based on show
  let episodes: Episode[] = [];
  
  if (showId === '1') {
    // Crime Junkie episodes
    episodes = [
      {
        id: '1',
        showId,
        title: 'MURDERED: Oakey "Al" Kite',
        description: 'When Oakey "Al" Kite is brutally murdered in his own home in the spring of 2004, investigators rush to piece together the clues and find the killer.',
        duration: '56m',
        publishDate: 'August 18, 2025',
        episodeNumber: 45,
        isNew: true,
      },
      {
        id: '2',
        showId,
        title: 'MURDERED: Jodine Serrin Part 1',
        description: 'On Valentine\'s Day in 2007, 39-year-old Jodine Serrin was brutally murdered and desecrated in her Carlsbad, California apartment.',
        duration: '56m',
        publishDate: 'August 18, 2025',
        episodeNumber: 44,
      },
      {
        id: '3',
        showId,
        title: 'MURDERED: Wendy Jerome',
        description: 'When a teenage girl goes out to deliver a birthday card to her best friend, she never makes it home.',
        duration: '56m',
        publishDate: 'August 18, 2025',
        episodeNumber: 43,
      }
    ];
  } else if (showId === '2') {
    // The Daily episodes - 15 episodes for 3 load more clicks
    episodes = [
      {
        id: '1',
        showId,
        title: 'The Sunday Read: The Rise of AI in Healthcare',
        description: 'How artificial intelligence is transforming medical diagnosis and treatment, and what it means for the future of healthcare.',
        duration: '45m',
        publishDate: 'December 22, 2024',
        episodeNumber: 1250,
        isNew: true,
      },
      {
        id: '2',
        showId,
        title: 'A Historic Climate Agreement',
        description: 'World leaders reach a landmark deal on carbon emissions. We examine what it means and whether it goes far enough.',
        duration: '28m',
        publishDate: 'December 21, 2024',
        episodeNumber: 1249,
      },
      {
        id: '3',
        showId,
        title: 'The Housing Crisis, Explained',
        description: 'Why housing costs continue to soar across America, and what proposed solutions could mean for buyers and renters.',
        duration: '32m',
        publishDate: 'December 20, 2024',
        episodeNumber: 1248,
      },
      {
        id: '4',
        showId,
        title: 'Inside the Border Debate',
        description: 'A deep dive into immigration policy changes and their impact on communities along the southern border.',
        duration: '35m',
        publishDate: 'December 19, 2024',
        episodeNumber: 1247,
      },
      {
        id: '5',
        showId,
        title: 'The Future of Social Media Regulation',
        description: 'As Congress considers new rules for tech companies, we explore what changes could be coming to your feeds.',
        duration: '30m',
        publishDate: 'December 18, 2024',
        episodeNumber: 1246,
      },
      {
        id: '6',
        showId,
        title: 'A Year of Economic Uncertainty',
        description: 'Looking back at inflation, interest rates, and what economic indicators tell us about the year ahead.',
        duration: '33m',
        publishDate: 'December 17, 2024',
        episodeNumber: 1245,
      },
      {
        id: '7',
        showId,
        title: 'The Education Funding Crisis',
        description: 'Schools across the country face budget shortfalls. We visit three districts to understand the impact.',
        duration: '29m',
        publishDate: 'December 16, 2024',
        episodeNumber: 1244,
      },
      {
        id: '8',
        showId,
        title: 'The Supreme Court Term in Review',
        description: 'Analyzing the most significant decisions from this term and their implications for American law.',
        duration: '38m',
        publishDate: 'December 15, 2024',
        episodeNumber: 1243,
      },
      {
        id: '9',
        showId,
        title: 'The Global Food Crisis',
        description: 'How climate change and conflict are creating food shortages around the world, and what can be done.',
        duration: '31m',
        publishDate: 'December 14, 2024',
        episodeNumber: 1242,
      },
      {
        id: '10',
        showId,
        title: 'Inside the Lab Leak Debate',
        description: 'New evidence emerges about the origins of COVID-19. We examine the latest findings and ongoing investigations.',
        duration: '34m',
        publishDate: 'December 13, 2024',
        episodeNumber: 1241,
      },
      {
        id: '11',
        showId,
        title: 'The Mental Health Crisis in Schools',
        description: 'Students and teachers struggle with unprecedented levels of anxiety and depression. What schools are doing to help.',
        duration: '27m',
        publishDate: 'December 12, 2024',
        episodeNumber: 1240,
      },
      {
        id: '12',
        showId,
        title: 'The Electric Vehicle Revolution',
        description: 'Major automakers go all-in on EVs. We look at what this means for consumers, workers, and the climate.',
        duration: '30m',
        publishDate: 'December 11, 2024',
        episodeNumber: 1239,
      },
      {
        id: '13',
        showId,
        title: 'The New Space Race',
        description: 'Private companies and nations compete to establish a presence on the moon and Mars. What\'s at stake?',
        duration: '36m',
        publishDate: 'December 10, 2024',
        episodeNumber: 1238,
      },
      {
        id: '14',
        showId,
        title: 'The Fentanyl Crisis: A New Chapter',
        description: 'How a synthetic drug is reshaping America\'s opioid epidemic and overwhelming communities.',
        duration: '33m',
        publishDate: 'December 9, 2024',
        episodeNumber: 1237,
      },
      {
        id: '15',
        showId,
        title: 'The Fight Over Book Bans',
        description: 'Libraries and schools become battlegrounds over what students can read. We visit communities on both sides.',
        duration: '29m',
        publishDate: 'December 8, 2024',
        episodeNumber: 1236,
      }
    ];
  } else {
    // Default/other shows
    episodes = [
      {
        id: '1',
        showId,
        title: 'Episode 1: The Beginning',
        description: 'Our first episode where we explore the origins and set the stage for what\'s to come.',
        duration: '40m',
        publishDate: 'January 15, 2024',
        episodeNumber: 1,
      },
      {
        id: '2',
        showId,
        title: 'Episode 2: Going Deeper',
        description: 'We dive deeper into the topic, exploring new perspectives and uncovering hidden insights.',
        duration: '45m',
        publishDate: 'January 8, 2024',
        episodeNumber: 2,
      }
    ];
  }
  
  await new Promise(resolve => setTimeout(resolve, 100));
  return episodes.filter(ep => ep.showId === showId);
}