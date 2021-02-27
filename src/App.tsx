import React, { useEffect } from 'react'
import loadable from '@loadable/component'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { useThemeStore, Theme } from './zustand/stores'
import NavBar from './components/common/NavBar/NavBar'

const Home = loadable(() => import('./pages/home/Home'))
const Search = loadable(() => import('./pages/search/Search'))
const Anime = loadable(() => import('./pages/anime/Anime'))

const App = () => {
  useEffect(() => {
    useThemeStore.subscribe(
      (state: Theme) => (document.body.className = state),
      state => state.theme
    )
  }, [])

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/anime/:id/:tab?'>
            <Anime />
          </Route>
          <Route path='/'>
            <div id='container'>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/search'>
                <Search />
              </Route>
            </div>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
