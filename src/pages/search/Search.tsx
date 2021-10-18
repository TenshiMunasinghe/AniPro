import { Route, Switch } from 'react-router-dom'
import NavBar from '../../components/common/NavBar/NavBar'
import Footer from '../../components/home/Footer/Footer'
import CharactersSearchResult from '../../components/search/CharactersSearchResult/CharactersSearchResult'
import Media from '../../components/search/Media/Media'
import ScrollButton from '../../components/search/ScrollButton/ScrollButton'
import StaffSearchResult from '../../components/search/StaffSearchResult/StaffSearchResult'
import { MediaTypes } from '../../filterOptions/filterOptions'
import { MediaType } from '../../generated'

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
      <Switch>
        <Route exact path={`/search/anime`}>
          <Media type={MediaType.Anime} />
        </Route>
        <Route exact path={`/search/manga`}>
          <Media type={MediaType.Manga} />
        </Route>
        <Route exact path={`/search/staff/:option?`}>
          <StaffSearchResult />
        </Route>
        <Route exact path={`/search/characters`}>
          <CharactersSearchResult />
        </Route>
      </Switch>
      <ScrollButton />
      <Footer />
    </>
  )
}

export default Search
