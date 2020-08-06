import React, { useState } from 'react'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { HEADER_HEIGHT } from './components/Header'
import SearchResult from './pages/SearchResult'
import Header from './components/Header'

const App = () => {
  const [searchText, setSearchText] = useState('')

  return (
    <Wrapper>
      <Header setSearchText={setSearchText} />
      <Router>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/search' />
          </Route>
          <Route exact path='/search'>
            <SearchResult searchText={searchText} />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: ${HEADER_HEIGHT}rem;
`

export default App
