import { SortBy } from '../filterOptions/filterOptions'

export interface QueryVar {
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

export interface QueryData {
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

export type PageInfo = QueryData['Page']['pageInfo']

export type FetchedMedias = QueryData['Page']['media'][number]

export interface Watch {
  streamingEpisodes: {
    site: string
    title: string
    thumbnail: string
    url: string
  }[]
}

export interface Characters {
  characters: {
    edges: {
      node: {
        id: number
        name: {
          full: string
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
}

export interface Staff {
  staff: {
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
}

export interface Stats {
  rankings: {
    rank: number
    context: string
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
    }
  }[]
  stats: {
    scoreDistribution: {
      score: number
      amount: number
    }[]
    statusDistribution: {
      status: number
      amount: number
    }[]
  }
}

export interface Overview extends Watch, Characters, Staff {
  title: {
    romaji: string
    english: string
    native: string
  }
  coverImage: {
    large: string
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
  stats: {
    scoreDistribution: {
      score: number
      amount: number
    }
    statusDistribution: {
      status: string
      amount: number
    }
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
        }
      }
    }[]
  }
}

export type AnimeDetails = {
  overview: Overview
  watch: Watch
  characters: Characters
  staff: Staff
  stats: Stats
}
