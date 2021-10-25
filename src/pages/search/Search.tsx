import { Route, Switch } from 'react-router-dom'
import NavBar from '../../components/common/NavBar/NavBar'
import SearchBarInput from '../../components/common/SearchBarInput/SearchBarInput'
import Footer from '../../components/home/Footer/Footer'
import Media from '../../components/search/Media/Media'
import CharactersSearchResult from '../../components/search/PeopleSearchResult/CharactersSearchResult'
import StaffSearchResult from '../../components/search/PeopleSearchResult/StaffSearchResult'
import ScrollButton from '../../components/search/ScrollButton/ScrollButton'
import { MediaTypes } from '../../filterOptions/filterOptions'
import { MediaType } from '../../generated'
import styles from './Search.module.scss'

export type SearchSlugs =
  | keyof typeof MediaTypes
  | 'characters'
  | 'staff'
  | 'reviews'
  | 'recommendations'

const Search = () => {
  return (
    <>
      <NavBar />
      <main className={styles.container}>
        <Switch>
          <Route exact path={`/search/anime`}>
            <Media type={MediaType.Anime} />
          </Route>
          <Route exact path={`/search/manga`}>
            <Media type={MediaType.Manga} />
          </Route>
          <Route exact path={`/search/staff/:option?`}>
            <Route exact path='/search/staff'>
              <h5>Search Staff</h5>
              <SearchBarInput type='staff' />
              <StaffSearchResult isBirthday={true} heading='Birthdays' />
              <StaffSearchResult heading='Most Favourited Staff' />
            </Route>
            <Route exact path='/search/staff/birthday'></Route>
            <Route exact path='/search/staff/favourite'></Route>
          </Route>
          <Route exact path={`/search/characters`}>
            <CharactersSearchResult />
          </Route>
        </Switch>
      </main>
      <ScrollButton />
      <Footer />
    </>
  )
}

export default Search
