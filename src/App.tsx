import React from 'react'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { HEADER_HEIGHT } from './components/Header'
import SearchResult from './pages/SearchResult'
import Header from './components/Header'

const App = () => {
  return (
    <RecoilRoot>
      <Wrapper>
        <Header />
        <Router>
          <Switch>
            <Route exact path='/'>
              <Redirect to='/search' />
            </Route>
            <Route exact path='/search'>
              <SearchResult />
            </Route>
          </Switch>
        </Router>
      </Wrapper>
    </RecoilRoot>
  )
}

const Wrapper = styled.div`
  padding-top: ${HEADER_HEIGHT}rem;
`

export default App
