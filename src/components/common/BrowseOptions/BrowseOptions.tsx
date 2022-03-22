import { FaBook, FaPlay, FaUserAstronaut, FaUserTie } from 'react-icons/fa'
import Category from './Category'
import IconLink from './IconLink'

const BrowseOptions = () => {
  return (
    <div className='group relative'>
      <button>Browse</button>
      <div className='pointer-events-none absolute bottom-full right-0 flex flex-col overflow-hidden rounded opacity-0 shadow shadow-zinc-400 transition-opacity group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100 dark:shadow-zinc-900 lg:top-full lg:bottom-auto'>
        <div className='flex flex-col space-y-3 bg-zinc-100 p-4 dark:bg-zinc-700'>
          <Category
            Icon={FaPlay}
            title={{ to: '/search/anime', text: 'Anime' }}
            links={[
              { to: '/search/anime?sortBy=SCORE_DESC', text: 'Top Anime' },
              { to: '/search/anime?sortBy=TRENDING_DESC', text: 'Trending' },
              {
                to: '/search/anime?sortBy=SCORE_DESC&FORMAT=MOVIE',
                text: 'Top Movies',
              },
            ]}
          />
          <Category
            Icon={FaBook}
            title={{ to: '/search/manga', text: 'Manga' }}
            links={[
              { to: '/search/manga?sortBy=SCORE_DESC', text: 'Top Manga' },
              { to: '/search/manga?sortBy=TRENDING_DESC', text: 'Trending' },
              {
                to: '/search/manga?sortBy=SCORE_DESC&country=KR',
                text: 'Top Manhwa',
              },
            ]}
          />
        </div>
        <div className='flex space-x-4 bg-zinc-50 p-4 dark:bg-zinc-800'>
          <IconLink to='/search/staff'>
            <FaUserTie />
            <span>Staff</span>
          </IconLink>
          <IconLink to='/search/characters'>
            <FaUserAstronaut />
            <span>Characters</span>
          </IconLink>
        </div>
      </div>
    </div>
  )
}

export default BrowseOptions
