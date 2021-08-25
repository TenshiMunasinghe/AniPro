import { SortBy } from '../filterOptions/filterOptions'

interface QueryVar {
  page?: number
  genres?: string[]
  year?: string
  season?: string
  format?: string
  status?: string
  country?: string
  source?: string
  searchText?: string | null
  sortBy?: SortBy
  perPage: number
}

interface QueryData {
  Page: {
    pageInfo: {
      currentPage: number
      hasNextPage: boolean
      lastPage: number
    }
    media: {
      id: number
      title: {
        english: string
        romaji: string
      }
      bannerImage: string
      coverImage: {
        extraLarge: string
        large: string
        color: string
      }
      status: 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED'
      genres: string[]
      meanScore: number
      description: string
      format: string
      season: string | null
      seasonYear: number | null
      episodes: number | null
      duration: number
      popularity: number
      studios: {
        nodes: { name: string }[] | undefined[]
      }
      nextAiringEpisode: {
        timeUntilAiring: number
        episode: number
      } | null
      rankings: {
        rank: number
        context: string
        year: number
        season: string
        allTime: boolean
      }[]
    }[]
  }
}

type PageInfo = QueryData['Page']['pageInfo']

type Media = QueryData['Page']['media'][number]

interface Watch {
  streamingEpisodes: {
    title: string
    thumbnail: string
    url: string
  }[]
}

interface Characters {
  pageInfo: {
    currentPage: number
    hasNextPage: boolean
  }
  edges: {
    node: {
      id: number
      name: {
        full: string
      }
      image: {
        large: string
      }
    }
    role: string
    voiceActors: {
      id: number
      name: {
        full: string
      }
      image: {
        large: string
      }
    }[]
  }[]
}

interface Staff {
  pageInfo: {
    currentPage: number
    hasNextPage: boolean
  }
  edges: {
    node: {
      id: number
      name: {
        full: string
      }
      image: {
        large: string
      }
    }
    role: string
  }[]
}

interface Review {
  pageInfo: {
    currentPage: number
    hasNextPage: boolean
  }
  nodes: {
    id: number
    summary: string
    rating: number
    ratingAmount: number
    score: number
    user: {
      name: string
      avatar: {
        medium: string
      }
    }
  }[]
}

interface Stats {
  status: string
  rankings: {
    id: number
    rank: number
    context: string
    type: string
    year: number | null
    season: string | null
    allTime: boolean
  }[]
  trends: {
    nodes: {
      date: number
      trending: number
      averageScore: number
      inProgress: number
    }[]
  }
  stats: {
    scoreDistribution: {
      score: number
      amount: number
    }[]
    statusDistribution: {
      status: string
      amount: number
    }[]
  }
}

interface Overview extends Watch {
  status: string
  relations: {
    edges: {
      node: {
        id: number
        title: {
          romaji: string
        }
        coverImage: {
          large: string
        }
        format: string
        status: string
      }
      relationType: string
    }[]
  }
  characters: Omit<Characters, 'pageInfo'>
  staff: Omit<Staff, 'pageInfo'>
  reviews: Omit<Review, 'pageInfo'>
  stats: {
    scoreDistribution: {
      score: number
      amount: number
    }[]
    statusDistribution: {
      status: string
      amount: number
    }[]
  }
  trailer: {
    id: number
    site: string
    thumbnail: string
  } | null
  recommendations: {
    nodes: {
      mediaRecommendation: {
        id: number
        title: {
          romaji: string
        }
        coverImage: {
          large: string
          color: string
        }
      }
    }[]
  }
}

interface Common extends Watch {
  title: {
    romaji: string
    english: string
    native: string
  }
  coverImage: {
    large: string
    extraLarge: string
    color: string
  }
  bannerImage: string
  description: string
  nextAiringEpisode: {
    episode: number
    timeUntilAiring: number
  } | null
  format: string
  episodes: number
  duration: number
  status: string
  startDate: {
    year: number
    month: number
    day: number
  }
  endDate: {
    year: number
    month: number
    day: number
  }
  season: string
  seasonYear: number
  averageScore: number
  meanScore: number
  popularity: number
  favourites: number
  studios: {
    nodes:
      | {
          name: string
        }[]
      | undefined[]
  }
  source: string
  hashtag: string | null
  genres: string[]
  synonyms: string[]
  externalLinks: {
    url: string
    site: string
  }[]
  staff: {
    edges: {
      node: {
        id: number
      }
    }[]
  }
  characters: {
    edges: {
      node: {
        id: number
      }
    }[]
  }
}

type AnimeDetails = {
  overview: Overview
  watch: Watch
  characters: Characters
  staff: Staff
  stats: Stats
  common: Common
}
