import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { useWindowResize } from './hooks/useWindowResize'
import { Search } from './pages/search/Search'
import { Anime } from './pages/anime/Anime'
import { Home } from './pages/home/Home'
import { Header } from './components/common/Header/Header'
import { useThemeStore, ThemeStore } from './zustand/stores'

const themeSelector = (state: ThemeStore) => state.theme

export const App = () => {
  const theme = useThemeStore(themeSelector)
  useWindowResize()

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/anime/:id'>
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
