import { Route, Switch } from 'react-router-dom'
import NavBar from '../components/common/NavBar'
import PageWrapper from '../components/common/PageWrapper'
import Media from '../components/search/Media'
import PeopleHeader from '../components/search/PeopleHeader'
import CharactersSearchResult from '../components/search/PeopleSearchResult/CharactersSearchResult'
import StaffSearchResult from '../components/search/PeopleSearchResult/StaffSearchResult'
import ScrollButton from '../components/search/ScrollButton'
import { MediaType } from '../generated'

export const SEARCH_SLUGS = [
  'anime',
  'manga',
  'staff',
  'characters',
  // 'reviews',
  // 'recommendations',
] as const

export type SearchSlugs = typeof SEARCH_SLUGS[number]

const Search = () => {
  return (
    <>
      <NavBar position='fixed' />
      <PageWrapper className='space-y-16'>
        <Switch>
          <Route exact path='/search/anime'>
            <Media type={MediaType.Anime} />
          </Route>
          <Route exact path='/search/manga'>
            <Media type={MediaType.Manga} />
          </Route>
          <Route path='/search/staff/'>
            <Route exact path='/search/staff'>
              <PeopleHeader heading='Search Staff' />
              <StaffSearchResult
                isBirthday={true}
                heading={{ text: 'Birthdays', link: '/search/staff/birthday' }}
              />
              <StaffSearchResult
                heading={{
                  text: 'Most Favourited Staff',
                  link: '/search/staff/favourite',
                }}
              />
            </Route>
            <Route exact path='/search/staff/birthday'>
              <PeopleHeader heading='Birthday Staff' />
              <StaffSearchResult isBirthday={true} />
            </Route>
            <Route exact path='/search/staff/favourite'>
              <PeopleHeader heading='Most Favourited Staff' />
              <StaffSearchResult />
            </Route>
          </Route>
          <Route path='/search/characters'>
            <Route exact path='/search/characters'>
              <PeopleHeader heading='Search Characters' />
              <CharactersSearchResult
                isBirthday={true}
                heading={{
                  text: 'Birthdays',
                  link: '/search/characters/birthday',
                }}
              />
              <CharactersSearchResult
                heading={{
                  text: 'Most Favourited Characters',
                  link: '/search/characters/favourite',
                }}
              />
            </Route>
            <Route exact path='/search/characters/birthday'>
              <PeopleHeader heading='Birthday Characters' />
              <CharactersSearchResult isBirthday={true} />
            </Route>
            <Route exact path='/search/characters/favourite'>
              <PeopleHeader heading='Most Favourited Characters' />
              <CharactersSearchResult />
            </Route>
          </Route>
        </Switch>
      </PageWrapper>
      <ScrollButton />
    </>
  )
}

export default Search
